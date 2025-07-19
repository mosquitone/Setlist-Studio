'use client';

import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Email as EmailIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const CONFIRM_EMAIL_CHANGE = gql`
  mutation ConfirmEmailChange($input: EmailChangeConfirmInput!) {
    confirmEmailChange(input: $input) {
      success
      message
    }
  }
`;

export default function ConfirmEmailChangeClient() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [confirmEmailChange] = useMutation(CONFIRM_EMAIL_CHANGE, {
    onCompleted: (data) => {
      if (data.confirmEmailChange.success) {
        setStatus('success');
        setMessage(data.confirmEmailChange.message);
        // 3秒後にプロフィールページにリダイレクト
        setTimeout(() => {
          router.push('/profile?message=メールアドレスが正常に変更されました');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.confirmEmailChange.message || 'メールアドレス変更に失敗しました');
      }
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message);
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      confirmEmailChange({
        variables: {
          input: { token },
        },
      });
    } else {
      setStatus('error');
      setMessage('無効な変更確認リンクです。');
    }
  }, [searchParams, confirmEmailChange]);

  const renderIcon = () => {
    switch (status) {
      case 'loading':
        return <CircularProgress size={64} sx={{ mb: 2 }} />;
      case 'success':
        return <EmailIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'メールアドレス変更処理中...';
      case 'success':
        return 'メールアドレス変更完了';
      case 'error':
        return 'メールアドレス変更エラー';
    }
  };

  const getAlertSeverity = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {renderIcon()}
            <Typography variant="h4" component="h1" gutterBottom>
              {getTitle()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {status === 'loading' && 'メールアドレス変更を処理しています...'}
              {status === 'success' && 'メールアドレスが正常に変更されました。'}
              {status === 'error' && 'メールアドレス変更に問題が発生しました。'}
            </Typography>
          </Box>

          {message && (
            <Alert severity={getAlertSeverity()} sx={{ mb: 3 }}>
              {message}
              {status === 'success' && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  3秒後にプロフィールページに移動します...
                </Typography>
              )}
            </Alert>
          )}

          <Box textAlign="center">
            <Typography variant="body2">
              <Link href="/profile" style={{ color: 'inherit' }}>
                ← プロフィールページに戻る
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
