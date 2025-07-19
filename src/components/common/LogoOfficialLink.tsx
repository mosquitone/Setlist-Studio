'use client';

import { Box, Link, SxProps, Theme } from '@mui/material';
import { useI18n } from '@/hooks/useI18n';

interface LogoOfficialLinkProps {
  /**
   * ロゴの高さ（レスポンシブ対応）
   * @default xs: 50, md: 70
   */
  height?: { xs: number; md: number };

  /**
   * リンク先URL
   * @default "https://www.mosquit.one/"
   */
  href?: string;

  /**
   * 新しいタブで開くか
   * @default true
   */
  openNewTab?: boolean;

  /**
   * 追加のスタイル
   */
  sx?: SxProps<Theme>;
}

/**
 * mosquitoneロゴのリンクコンポーネント
 * デスクトップ版とモバイル版で異なるインタラクションを提供
 */
export function LogoOfficialLink({
  height = { xs: 50, md: 70 },
  href = 'https://www.mosquit.one/',
  openNewTab = true,
  sx = {},
}: LogoOfficialLinkProps) {
  const { messages } = useI18n();
  return (
    <Link
      href={href}
      target={openNewTab ? '_blank' : undefined}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
      underline="none"
      sx={{
        position: 'relative',
        display: 'inline-block',
        // 共通スタイル
        '&::before': {
          content: '"🌐"',
          position: 'absolute',
          top: -8,
          right: -8,
          fontSize: '16px',
          zIndex: 1,
        },
        '&::after': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'primary.main',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        },
        // デスクトップ版（ホバー対応）
        '@media (hover: hover)': {
          '&::before': {
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
          '&::after': {
            content: `"${messages.common.logoOfficialSite}"`,
            bottom: -15,
            fontSize: '12px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::after': {
            opacity: 1,
          },
        },
        // モバイル版（タップ対応）
        '@media (hover: none)': {
          '&::before': {
            opacity: 0.7,
            animation: 'pulse 2s infinite',
          },
          '&::after': {
            content: `"${messages.common.logoOfficialSiteTap}"`,
            bottom: -8,
            fontSize: '11px',
            opacity: 0.8,
            animation: 'fadeInOut 3s infinite',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
        // アニメーション定義
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        '@keyframes fadeInOut': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.9 },
        },
        '@keyframes breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/MQT_LOGO_BLACK.png"
        alt="mosquitone logo"
        sx={{
          height,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
          // デスクトップ版
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'scale(1.05) rotate(2deg)',
              filter: 'drop-shadow(0 8px 16px rgba(37,99,235,0.3))',
            },
          },
          // モバイル版
          '@media (hover: none)': {
            filter: 'drop-shadow(0 4px 8px rgba(37,99,235,0.2))',
            animation: 'breathe 4s ease-in-out infinite',
          },
        }}
      />
    </Link>
  );
}
