'use client';

import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { PersonAdd as PersonAddIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REGISTER } from '@/lib/server/graphql/apollo-operations';
import { validateField, ValidationRules } from '@/lib/security/validation-rules';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterClient() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: () => {
      // 新規登録成功後はログイン画面へ遷移
      router.push('/login?message=新規登録が完了しました。ログインしてください。');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const validatePassword = (password: string): string | null => {
    const result = validateField(password, 'password');
    return result.isValid ? null : result.message || 'パスワードが無効です';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // パスワード強度チェック
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (!agreeToTerms) {
      setError('利用規約およびプライバシーポリシーに同意してください');
      return;
    }

    register({
      variables: {
        input: { email, username, password },
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <PersonAddIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              新規登録
            </Typography>
            <Typography variant="body1" color="text.secondary">
              アカウントを作成して、セットリストを管理しましょう
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ユーザー名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              autoComplete="username"
            />
            <TextField
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="パスワード"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
              helperText={ValidationRules.password.message}
              inputProps={{
                pattern: ValidationRules.password.pattern.source,
                title: ValidationRules.password.message,
                minLength: ValidationRules.password.minLength,
                maxLength: ValidationRules.password.maxLength,
              }}
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
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  <Link href="/terms" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    利用規約
                  </Link>
                  および
                  <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    プライバシーポリシー
                  </Link>
                  に同意します
                </Typography>
              }
              sx={{ mt: 2, mb: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading || !agreeToTerms}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {loading ? '登録中...' : '新規登録'}
            </Button>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2">
              すでにアカウントをお持ちですか？{' '}
              <Link href="/login" style={{ color: 'inherit' }}>
                <strong>ログイン</strong>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
