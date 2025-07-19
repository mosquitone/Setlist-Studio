'use client';

import HomeClient from './HomeClient';
import NoSSR from '@/components/common/ui/NoSSR';
import { Container, Box, Typography } from '@mui/material';
import { useI18n } from '@/hooks/useI18n';

// Disable caching for authentication-dependent content
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { messages } = useI18n();

  return (
    <NoSSR
      fallback={
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: '60vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {messages.common.loading}
            </Typography>
          </Box>
        </Container>
      }
    >
      <HomeClient />
    </NoSSR>
  );
}
