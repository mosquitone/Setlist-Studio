'use client';

import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { AuthLink } from '@/components/common/auth/LoginLink';
import { useI18n } from '@/hooks/useI18n';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType;
}

interface MobileNavigationProps {
  items: NavigationItem[];
  isLoading: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
}

export function MobileNavigation({
  items,
  isLoading,
  mobileOpen,
  onToggle,
}: MobileNavigationProps) {
  const { isLoggedIn, user, logout } = useAuth();
  const { messages } = useI18n();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <Box onClick={onToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      {isLoading ? (
        <List>
          {[1, 2].map((i) => (
            <ListItem key={i} disablePadding>
              <Skeleton
                variant="rounded"
                width="100%"
                height={48}
                sx={{
                  mx: 2,
                  my: 1,
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#2563eb',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.04)',
                    },
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <IconComponent />
                  </Box>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
      {!isLoading && items.length > 0 && <Divider />}

      {/* 認証ステータス関係なく統一したレイアウト */}
      <Box sx={{ p: 2 }}>
        {isLoggedIn && user && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            {user.username || user.email}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {isLoggedIn ? (
            <>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                href="/profile"
                startIcon={<PersonIcon />}
                sx={{
                  borderRadius: 10,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#6b7280',
                  color: '#6b7280',
                  fontWeight: 500,
                  border: '2px solid #6b7280',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(107, 114, 128, 0.04)',
                    borderColor: '#4b5563',
                  },
                }}
              >
                {messages.navigation.profile}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                disabled={isLoading}
                startIcon={<LogoutIcon />}
                sx={{
                  borderRadius: 10,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  fontWeight: 500,
                  border: '2px solid #3b82f6',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.04)',
                    borderColor: '#2563eb',
                  },
                  '&:disabled': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    color: 'rgba(59, 130, 246, 0.5)',
                  },
                }}
              >
                {isLoading ? messages.common.loading : messages.navigation.logout}
              </Button>
            </>
          ) : (
            <>
              <AuthLink variant="mobile" type="login" />
              <AuthLink variant="mobile" type="register" />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
