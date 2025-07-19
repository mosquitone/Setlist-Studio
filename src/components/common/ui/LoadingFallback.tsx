'use client';

import { Container, CircularProgress, Typography, Box } from '@mui/material';
import { useI18n } from '@/hooks/useI18n';

export default function LoadingFallback() {
  const { messages } = useI18n();
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          {messages.common.loading}
        </Typography>
      </Box>
    </Container>
  );
}
