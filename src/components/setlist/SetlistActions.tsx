'use client';

import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import {
  Edit as EditIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  ContentCopy as DuplicateIcon,
  ExpandMore as ExpandMoreIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { Theme } from '@/types/common';

interface SetlistActionsProps {
  onEdit: () => void;
  onDownload: () => void;
  onShare: () => void;
  onDuplicate: () => void;
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  showDebugToggle?: boolean;
  showDebug?: boolean;
  onDebugToggle?: () => void;
  isPublic?: boolean;
  onToggleVisibility?: () => void;
  isOwner?: boolean;
}

export function SetlistActions({
  onEdit,
  onDownload,
  onShare,
  onDuplicate,
  selectedTheme,
  onThemeChange,
  showDebugToggle = false,
  showDebug = false,
  onDebugToggle,
  isPublic = false,
  onToggleVisibility,
  isOwner = true,
}: SetlistActionsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    // モバイル版: 縦積み表示
    return (
      <Stack spacing={2} sx={{ mb: 3 }}>
        {/* アクションボタン群 */}
        <Stack spacing={1}>
          {/* 編集系ボタン（オーナーのみ） */}
          {isOwner && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEdit}
                size="small"
                sx={{
                  flex: 1,
                  fontSize: '0.75rem',
                  px: 1,
                }}
              >
                編集
              </Button>
              <Button
                variant="outlined"
                startIcon={<DuplicateIcon />}
                onClick={onDuplicate}
                size="small"
                sx={{
                  flex: 1,
                  fontSize: '0.75rem',
                  px: 1,
                }}
              >
                複製
              </Button>
            </Stack>
          )}

          {/* 共有系ボタン（全ユーザー） */}
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={onDownload}
              size="small"
              sx={{
                flex: 1,
                fontSize: '0.75rem',
                px: 1,
              }}
            >
              ダウンロード
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={onShare}
              size="small"
              sx={{
                flex: 1,
                fontSize: '0.75rem',
                px: 1,
              }}
            >
              共有
            </Button>
          </Stack>
        </Stack>

        {/* 設定・ツール群 */}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
          {isOwner && onToggleVisibility && (
            <Tooltip title={isPublic ? '非公開にする' : '公開にする'}>
              <IconButton
                onClick={onToggleVisibility}
                size="small"
                sx={{
                  color: isPublic ? '#16a34a' : '#6b7280',
                  backgroundColor: isPublic ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                  '&:hover': {
                    backgroundColor: isPublic
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(156, 163, 175, 0.2)',
                  },
                }}
              >
                {isPublic ? <PublicIcon /> : <LockIcon />}
              </IconButton>
            </Tooltip>
          )}

          {!isOwner && (
            <Tooltip title={isPublic ? '公開セットリスト' : '非公開セットリスト'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isPublic ? '#16a34a' : '#6b7280',
                  backgroundColor: isPublic ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {isPublic ? <PublicIcon /> : <LockIcon />}
              </Box>
            </Tooltip>
          )}

          {showDebugToggle && onDebugToggle && (
            <Button
              variant={showDebug ? undefined : 'outlined'}
              onClick={onDebugToggle}
              size="small"
              sx={{
                minWidth: '60px',
                fontSize: '0.75rem',
                color: showDebug ? 'white' : 'text.secondary',
                borderColor: showDebug ? 'primary.main' : 'grey.400',
                backgroundColor: showDebug ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: showDebug ? 'primary.dark' : 'grey.50',
                },
              }}
            >
              {showDebug ? 'DOM' : 'IMG'}
            </Button>
          )}

          {isOwner && (
            <FormControl size="small">
              <Select
                value={selectedTheme}
                onChange={(e) => onThemeChange(e.target.value as Theme)}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={{ minWidth: 120 }}
                renderValue={(value) => {
                  if (value === 'black') return 'Theme: black';
                  if (value === 'white') return 'Theme: white';
                  return 'Theme: black';
                }}
              >
                <MenuItem value="black">black</MenuItem>
                <MenuItem value="white">white</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
    );
  }

  // デスクトップ版: 横並び表示
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {isOwner && (
          <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
            編集
          </Button>
        )}
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={onDownload}>
          ダウンロード
        </Button>
        <Button variant="outlined" startIcon={<ShareIcon />} onClick={onShare}>
          共有
        </Button>
        {isOwner && (
          <Button variant="outlined" startIcon={<DuplicateIcon />} onClick={onDuplicate}>
            複製
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {isOwner && onToggleVisibility && (
          <Tooltip title={isPublic ? '非公開にする' : '公開にする'}>
            <IconButton
              onClick={onToggleVisibility}
              sx={{
                color: isPublic ? '#16a34a' : '#6b7280',
                backgroundColor: isPublic ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                '&:hover': {
                  backgroundColor: isPublic ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                },
              }}
            >
              {isPublic ? <PublicIcon /> : <LockIcon />}
            </IconButton>
          </Tooltip>
        )}

        {!isOwner && (
          <Tooltip title={isPublic ? '公開セットリスト' : '非公開セットリスト'}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: isPublic ? '#16a34a' : '#6b7280',
                backgroundColor: isPublic ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                borderRadius: 1,
                p: 1,
              }}
            >
              {isPublic ? <PublicIcon /> : <LockIcon />}
            </Box>
          </Tooltip>
        )}
        {showDebugToggle && onDebugToggle && (
          <Button
            variant={showDebug ? undefined : 'outlined'}
            onClick={onDebugToggle}
            size="small"
            sx={{
              minWidth: '60px',
              fontSize: '0.75rem',
              color: showDebug ? 'white' : 'text.secondary',
              borderColor: showDebug ? 'primary.main' : 'grey.400',
              backgroundColor: showDebug ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: showDebug ? 'primary.dark' : 'grey.50',
              },
            }}
          >
            {showDebug ? 'DOM' : 'IMG'}
          </Button>
        )}

        {isOwner && (
          <FormControl size="small">
            <Select
              value={selectedTheme}
              onChange={(e) => onThemeChange(e.target.value as Theme)}
              displayEmpty
              IconComponent={ExpandMoreIcon}
              sx={{ minWidth: 140 }}
              renderValue={(value) => {
                if (value === 'black') return 'Theme: black';
                if (value === 'white') return 'Theme: white';
                return 'Theme: black';
              }}
            >
              <MenuItem value="black">black</MenuItem>
              <MenuItem value="white">white</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
}
