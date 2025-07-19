'use client';

import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useI18n } from '@/hooks/useI18n';

interface LegalPageTemplateProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageTemplate: React.FC<LegalPageTemplateProps> = ({ title, children }) => {
  const { messages } = useI18n();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ mt: 4 }}>
          {children}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
            {messages.common.effectiveDate}：2025年7月18日
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LegalPageTemplate;
