'use client';

import React, { useState } from 'react';
import {
  Container,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { GET_SETLIST, TOGGLE_SETLIST_VISIBILITY } from '@/lib/server/graphql/apollo-operations';
import { SetlistData } from '@/types/components';
import { Theme } from '@/types/common';
import { ImageGenerator } from '@/components/setlist/ImageGenerator';
import { SetlistActions } from '@/components/setlist/SetlistActions';
import { SetlistPreview } from '@/components/setlist/SetlistPreview';
import { useSetlistActions } from '@/hooks/useSetlistActions';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useAuth } from '@/components/providers/AuthProvider';
import { SetlistProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useI18n } from '@/hooks/useI18n';

export default function SetlistDetailPage() {
  const params = useParams();
  const setlistId = params.id as string;
  const { messages } = useI18n();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [themeInitialized, setThemeInitialized] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  const { user, isLoggedIn, isLoading: authLoading } = useAuth();

  const { data, loading, error } = useQuery(GET_SETLIST, {
    variables: { id: setlistId },
    skip: !setlistId,
  });

  const [toggleVisibility] = useMutation(TOGGLE_SETLIST_VISIBILITY);

  const { handleEdit, handleDelete, handleShare, handleDuplicate, deleteLoading } =
    useSetlistActions({ setlistId, setlist: data?.setlist });

  const isOwner = React.useMemo(() => {
    return isLoggedIn && user && data?.setlist && data.setlist.userId === user.id;
  }, [isLoggedIn, user, data?.setlist]);

  const handleToggleVisibility = async () => {
    try {
      await toggleVisibility({ variables: { id: setlistId } });
      // Force page reload to refresh data with correct authentication context
      window.location.reload();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to toggle visibility:', error);
      }
    }
  };

  const {
    isGeneratingPreview,
    previewImage,
    showDebug,
    handleDownloadReady,
    handlePreviewReady,
    handlePreviewGenerationStart,
    handleDownload: onDownload,
    handleDebugToggle,
  } = useImageGeneration({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  // Initialize selectedTheme with the saved theme from database (only once)
  React.useEffect(() => {
    if (data?.setlist && !themeInitialized) {
      if (
        data.setlist.theme &&
        (data.setlist.theme === 'black' || data.setlist.theme === 'white')
      ) {
        setSelectedTheme(data.setlist.theme);
      } else {
        // Fallback to black if no theme is saved
        setSelectedTheme('black');
      }
      setThemeInitialized(true);
    }
  }, [data?.setlist, themeInitialized]);

  // setlistDataを安全に作成
  const setlistData: SetlistData | null = data?.setlist
    ? {
        id: data.setlist.id,
        title: data.setlist.title,
        bandName: data.setlist.bandName,
        eventName: data.setlist.eventName,
        eventDate: data.setlist.eventDate,
        openTime: data.setlist.openTime,
        startTime: data.setlist.startTime,
        theme: data.setlist.theme,
        items: [...data.setlist.items].sort((a, b) => a.order - b.order),
      }
    : null;

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  return (
    <SetlistProtectedRoute
      setlistData={data?.setlist}
      isLoading={loading || authLoading}
      error={error}
    >
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
        {/* データがない場合はSetlistProtectedRouteがハンドリング */}
        {!setlistData ? null /* テーマ初期化中の場合はローディングを表示 */ : selectedTheme ===
          null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Success Banner */}
            {showSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {messages.setlistDetail.successMessage}
              </Alert>
            )}

            <SetlistActions
              onEdit={handleEdit}
              onDownload={onDownload}
              onShare={handleShare}
              onDuplicate={handleDuplicate}
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
              showDebugToggle={isDev}
              showDebug={showDebug}
              onDebugToggle={handleDebugToggle}
              isPublic={data?.setlist?.isPublic}
              onToggleVisibility={handleToggleVisibility}
              isOwner={isOwner}
            />

            {setlistData && (
              <>
                <SetlistPreview
                  data={{ ...setlistData, theme: selectedTheme }}
                  selectedTheme={selectedTheme}
                  showDebug={showDebug}
                  isGeneratingPreview={isGeneratingPreview}
                  previewImage={previewImage}
                  qrCodeURL={`${typeof window !== 'undefined' ? window.location.origin : ''}/setlists/${setlistId}`}
                />

                <Box sx={{ display: 'none' }}>
                  <ImageGenerator
                    data={{ ...setlistData, theme: selectedTheme }}
                    selectedTheme={selectedTheme}
                    onDownloadReady={handleDownloadReady}
                    onPreviewReady={handlePreviewReady}
                    onPreviewGenerationStart={handlePreviewGenerationStart}
                  />
                </Box>
              </>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
              <DialogTitle>{messages.setlistDetail.deleteDialog.title}</DialogTitle>
              <DialogContent>
                <Typography>
                  「{data?.setlist?.title}」{messages.setlistDetail.deleteDialog.message}{' '}
                  {messages.setlistDetail.deleteDialog.warning}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)}>
                  {messages.setlistDetail.deleteDialog.cancel}
                </Button>
                <Button onClick={handleDelete} color="error" disabled={deleteLoading}>
                  {deleteLoading
                    ? messages.setlistDetail.deleteDialog.deleting
                    : messages.setlistDetail.deleteDialog.delete}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </SetlistProtectedRoute>
  );
}
