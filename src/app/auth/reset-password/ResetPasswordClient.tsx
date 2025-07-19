'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { LockReset as LockResetIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: PasswordResetInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

export default function ResetPasswordClient() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('無効なリセットリンクです。');
    }
  }, [searchParams]);

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: (data) => {
      if (data.resetPassword.success) {
        setSuccessMessage(data.resetPassword.message);
        setError('');
        // 3秒後にログインページにリダイレクト
        setTimeout(() => {
          router.push('/login?message=パスワードが正常にリセットされました');
        }, 3000);
      } else {
        setError(data.resetPassword.message || 'パスワードリセットに失敗しました');
        setSuccessMessage('');
      }
    },
    onError: (error) => {
      setError(error.message);
      setSuccessMessage('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (!token) {
      setError('無効なリセットトークンです');
      return;
    }

    await resetPassword({
      variables: {
        input: {
          token,
          newPassword,
        },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LockResetIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              新しいパスワード
            </Typography>
            <Typography variant="body1" color="text.secondary">
              アカウントの新しいパスワードを設定してください
            </Typography>
          </Box>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
              <br />
              <Typography variant="body2" sx={{ mt: 1 }}>
                3秒後にログインページに移動します...
              </Typography>
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!successMessage && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="新しいパスワード"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="new-password"
                helperText="8文字以上で、大文字・小文字・数字を含むパスワードを入力してください"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="パスワード確認"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="new-password"
                helperText="確認のため、もう一度同じパスワードを入力してください"
                error={confirmPassword !== '' && newPassword !== confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                size="large"
                disabled={loading || !token}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? 'パスワード設定中...' : 'パスワードを設定'}
              </Button>
            </Box>
          )}

          <Box textAlign="center">
            <Typography variant="body2">
              <Link href="/login" style={{ color: 'inherit' }}>
                ← ログインページに戻る
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
