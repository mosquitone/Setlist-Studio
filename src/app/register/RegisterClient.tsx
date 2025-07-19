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
import { useI18n } from '@/hooks/useI18n';

export default function RegisterClient() {
  const { messages } = useI18n();
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
      router.push(
        `/login?message=${messages.notifications.accountCreated || 'Account created successfully. Please login.'}`,
      );
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const validatePassword = (password: string): string | null => {
    const result = validateField(password, 'password');
    return result.isValid ? null : result.message || messages.validation.passwordTooShort;
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
      setError(messages.validation.passwordsDoNotMatch);
      return;
    }

    if (!agreeToTerms) {
      setError(messages.validation.agreeToTerms || 'Please agree to the terms and conditions');
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
              {messages.auth.register}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {messages.auth.createAccountToStart}
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
              label={messages.auth.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              autoComplete="username"
            />
            <TextField
              fullWidth
              label={messages.auth.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label={messages.auth.password}
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
              label={messages.auth.confirmPassword}
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
                    {messages.auth.terms}
                  </Link>
                  {messages.auth.and || 'and'}
                  <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    {messages.auth.privacy}
                  </Link>
                  {messages.auth.agree || 'に同意します'}
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
              {loading ? messages.common.loading : messages.auth.register}
            </Button>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2">
              {messages.auth.alreadyHaveAccount}{' '}
              <Link href="/login" style={{ color: 'inherit' }}>
                <strong>{messages.auth.login}</strong>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
