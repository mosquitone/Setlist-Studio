'use client';

import { useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/components/providers/AuthProvider';
import { useI18n, languageOptions } from '@/hooks/useI18n';
import { HeaderLogo } from './header/HeaderLogo';
import { DesktopNavigation } from './header/DesktopNavigation';
import { MobileNavigation } from './header/MobileNavigation';
import { UserMenu } from './header/UserMenu';
import { AuthLink } from '../auth/LoginLink';
import {
  getAuthenticatedNavigationItems,
  getPublicNavigationItems,
} from './header/navigationItems';

/**
 * アプリケーションヘッダーコンポーネント
 * 認証状態に応じてナビゲーションとユーザーメニューを表示
 * デスクトップ・モバイル両対応のレスポンシブデザイン
 */
export default function Header() {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const { lang, changeLanguage, messages } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ログイン状態に応じて表示するナビゲーション項目を決定（useMemoで最適化）
  const navigationItems = useMemo(
    () =>
      isLoggedIn
        ? [...getPublicNavigationItems(messages), ...getAuthenticatedNavigationItems(messages)]
        : getPublicNavigationItems(messages),
    [isLoggedIn, messages], // tに言語情報が含まれているため、langは不要
  );

  const handleLogout = () => {
    logout();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ borderRadius: 0 }}>
        <Toolbar>
          {/* モバイルハンバーガーメニュー */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileNavigation
              items={navigationItems}
              isLoading={isLoading}
              mobileOpen={mobileOpen}
              onToggle={handleDrawerToggle}
            />
          </Box>

          {/* モバイル: ロゴを完全中央配置 */}
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <HeaderLogo />
          </Box>

          {/* デスクトップ: ロゴを左に配置 */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <HeaderLogo />
          </Box>

          {/* デスクトップナビゲーション */}
          <DesktopNavigation items={navigationItems} isLoading={isLoading} />

          <Box sx={{ flexGrow: 1 }} />

          {/* 言語切り替え */}
          <Select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value as 'ja' | 'en')}
            size="small"
            renderValue={(value) => {
              const selectedOption = languageOptions.find((option) => option.value === value);
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 } }}>
                  <span>{selectedOption?.flag}</span>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    {selectedOption?.label}
                  </Box>
                </Box>
              );
            }}
            sx={{
              mr: { xs: 0, sm: 2 },
              minWidth: { xs: 20, sm: 100 },
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0, sm: 1 },
              },
            }}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{option.flag}</span>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    {option.label}
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>

          {/* デスクトップのみ: 認証ボタン/ユーザーメニュー */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                width={80}
                height={36}
                sx={{ borderRadius: 5, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              />
            ) : isLoggedIn ? (
              <UserMenu onAuthClick={handleLogout} />
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <AuthLink variant="header" type="login" />
                <AuthLink variant="header" type="register" />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
