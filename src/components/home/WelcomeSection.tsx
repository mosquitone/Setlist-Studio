'use client';

import { Box, Typography, Stack } from '@mui/material';
import { LogoOfficialLink } from '@/components/common/LogoOfficialLink';
import { useI18n } from '@/hooks/useI18n';

export function WelcomeSection() {
  const { messages } = useI18n();

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1, md: 2 }}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            // background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            // WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Powered by
        </Typography>
        <LogoOfficialLink height={{ xs: 50, md: 90 }} />
      </Stack>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 2,
          lineHeight: 1.6,
          maxWidth: { xs: '100%', md: '600px' },
          mx: 'auto',
          px: { xs: 2, md: 0 },
          fontSize: { xs: '0.95rem', md: '1rem' },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'block', md: 'inline' }, fontWeight: 'bold' }}>
          {messages.pages.home.heroTitle}
        </Box>
        <Box component="span" sx={{ display: 'block' }}>
          {messages.pages.home.heroSubtitle}
        </Box>
      </Typography>
    </Box>
  );
}
