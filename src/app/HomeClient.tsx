'use client';

import { Container, Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_SETLISTS } from '@/lib/server/graphql/apollo-operations';
import { GetSetlistsResponse } from '../types/graphql';
import { useAuth } from '@/components/providers/AuthProvider';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { FeatureSection } from '../components/home/FeatureSection';
import { SampleSetlistsSection } from '../components/home/SampleSetlistsSection';
import { SetlistDashboard } from '../components/home/SetlistDashboard';
import { AuthActions } from '../components/home/AuthActions';
import { useI18n } from '@/hooks/useI18n';

export default function HomeClient() {
  const { isLoggedIn, isLoading } = useAuth();
  const { messages } = useI18n();

  const { data: setlistsData, loading: setlistsLoading } = useQuery<GetSetlistsResponse>(
    GET_SETLISTS,
    {
      skip: !isLoggedIn,
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <WelcomeSection />
        <FeatureSection />
        <SampleSetlistsSection />

        {isLoggedIn && (
          <SetlistDashboard setlistsData={setlistsData} setlistsLoading={setlistsLoading} />
        )}

        {!isLoggedIn && <AuthActions />}
      </Box>
    </Container>
  );
}
