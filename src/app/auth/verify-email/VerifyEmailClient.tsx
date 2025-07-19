'use client';

import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { VerifiedUser as VerifiedUserIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: EmailVerificationInput!) {
    verifyEmail(input: $input) {
      success
      message
    }
  }
`;

const RESEND_VERIFICATION_EMAIL = gql`
  mutation ResendVerificationEmail($email: String!) {
    resendVerificationEmail(email: $email) {
      success
      message
    }
  }
`;

export default function VerifyEmailClient() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onCompleted: (data) => {
      if (data.verifyEmail.success) {
        setStatus('success');
        setMessage(data.verifyEmail.message);
        // 3秒後にログインページにリダイレクト
        setTimeout(() => {
          router.push('/login?message=メール認証が完了しました。ログインできます。');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.verifyEmail.message || 'メール認証に失敗しました');
        setCanResend(true);
      }
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message);
      setCanResend(true);
    },
  });

  const [resendVerificationEmail, { loading: resendLoading }] = useMutation(
    RESEND_VERIFICATION_EMAIL,
    {
      onCompleted: (data) => {
        if (data.resendVerificationEmail.success) {
          setMessage(data.resendVerificationEmail.message);
          setCanResend(false);
        }
      },
      onError: (error) => {
        setMessage(error.message);
      },
    },
  );

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (emailParam) {
      setEmail(emailParam);
    }

    if (token) {
      verifyEmail({
        variables: {
          input: { token },
        },
      });
    } else {
      setStatus('error');
      setMessage('無効な認証リンクです。');
      setCanResend(true);
    }
  }, [searchParams, verifyEmail]);

  const handleResendEmail = () => {
    if (email) {
      resendVerificationEmail({
        variables: { email },
      });
    }
  };

  const renderIcon = () => {
    switch (status) {
      case 'loading':
        return <CircularProgress size={64} sx={{ mb: 2 }} />;
      case 'success':
        return <VerifiedUserIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'メール認証中...';
      case 'success':
        return 'メール認証完了';
      case 'error':
        return 'メール認証エラー';
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
              {status === 'loading' && 'メールアドレスの認証を処理しています...'}
              {status === 'success' && '認証が完了しました。ログインできます。'}
              {status === 'error' && 'メール認証に問題が発生しました。'}
            </Typography>
          </Box>

          {message && (
            <Alert severity={getAlertSeverity()} sx={{ mb: 3 }}>
              {message}
              {status === 'success' && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  3秒後にログインページに移動します...
                </Typography>
              )}
            </Alert>
          )}

          {status === 'error' && canResend && email && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                onClick={handleResendEmail}
                disabled={resendLoading}
                sx={{ mb: 2 }}
              >
                {resendLoading ? '再送信中...' : '認証メールを再送信'}
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
