'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Visibility,
  Share,
  Download,
  PersonAdd,
  Lock,
  Public,
  Edit,
  LibraryMusic,
  PlaylistAdd,
  Home,
  Close,
  Check,
  AccountCircle,
  Palette,
  FileCopy,
  PersonOff,
} from '@mui/icons-material';
import { useI18n } from '@/hooks/useI18n';

export default function GuidePage() {
  const { messages } = useI18n();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" component="h1">
            {messages.pages.guide.title}
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          {messages.pages.guide.subtitle}
        </Typography>
      </Box>

      {/* Setlist Studioとは */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Public sx={{ mr: 2, color: 'primary.main' }} />
            {messages.pages.guide.aboutSection.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {messages.pages.guide.aboutSection.description1}
          </Typography>
          <Typography variant="body1" paragraph>
            {messages.pages.guide.aboutSection.description2}
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            {messages.pages.guide.aboutSection.alertInfo}
          </Alert>
        </CardContent>
      </Card>

      {/* 機能比較表 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {messages.pages.guide.featureComparison.title}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{messages.pages.guide.featureComparison.features}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PersonOff sx={{ mr: 1, color: 'warning.main' }} />
                      <strong>{messages.pages.guide.featureComparison.unregisteredUser}</strong>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AccountCircle sx={{ mr: 1, color: 'primary.main' }} />
                      <strong>{messages.pages.guide.featureComparison.registeredUser}</strong>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{messages.pages.guide.featureComparison.publicSetlistView}</TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{messages.pages.guide.featureComparison.imageDownload}</TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{messages.pages.guide.featureComparison.setlistShare}</TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.setlistManagement}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.songDatabase}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.publicitySettings}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.duplicateFunction}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.personalDashboard}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>{messages.pages.guide.featureComparison.profileManagement}</TableCell>
                  <TableCell align="center">
                    <Close sx={{ color: 'error.main' }} />
                  </TableCell>
                  <TableCell align="center">
                    <Check sx={{ color: 'success.main' }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* アカウント作成の利点 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <PersonAdd sx={{ mr: 2, color: 'warning.main' }} />
            {messages.pages.guide.accountBenefits.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {messages.pages.guide.accountBenefits.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <PlaylistAdd sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {messages.pages.guide.accountBenefits.setlistCreation.title}
                </Typography>
                <Typography variant="body2">
                  {messages.pages.guide.accountBenefits.setlistCreation.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <LibraryMusic sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {messages.pages.guide.accountBenefits.songManagement.title}
                </Typography>
                <Typography variant="body2">
                  {messages.pages.guide.accountBenefits.songManagement.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <Lock sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {messages.pages.guide.accountBenefits.privateFeatures.title}
                </Typography>
                <Typography variant="body2">
                  {messages.pages.guide.accountBenefits.privateFeatures.description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>{messages.pages.guide.accountBenefits.signUpNow}</strong>{' '}
              {messages.pages.guide.accountBenefits.signUpDescription}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* 使用方法 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {messages.pages.guide.publicUsage.title}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  1
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={messages.pages.guide.publicUsage.step1.title}
                secondary={messages.pages.guide.publicUsage.step1.description}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  2
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={messages.pages.guide.publicUsage.step2.title}
                secondary={messages.pages.guide.publicUsage.step2.description}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  3
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={messages.pages.guide.publicUsage.step3.title}
                secondary={messages.pages.guide.publicUsage.step3.description}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  4
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={messages.pages.guide.publicUsage.step4.title}
                secondary={messages.pages.guide.publicUsage.step4.description}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* 各ページ機能詳細 */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {messages.pages.guide.pageDetails.title}
          </Typography>

          <Grid container spacing={3}>
            {/* ホームページ */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Home sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">
                    {messages.pages.guide.pageDetails.homePage.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  <strong>{messages.pages.guide.featureComparison.unregisteredUser}:</strong>{' '}
                  {messages.pages.guide.pageDetails.homePage.unregisteredDescription}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>{messages.pages.guide.featureComparison.registeredUser}:</strong>{' '}
                  {messages.pages.guide.pageDetails.homePage.registeredDescription}
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.homePage.feature1}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.homePage.feature2}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.homePage.feature3}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* セットリスト詳細 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Visibility sx={{ mr: 2, color: 'success.main' }} />
                  <Typography variant="h6">
                    {messages.pages.guide.pageDetails.setlistDetail.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {messages.pages.guide.pageDetails.setlistDetail.description}
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Visibility sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature1}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Palette sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature2}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Download sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature3}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Share sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature4}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <Edit sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature5}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <FileCopy sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={messages.pages.guide.pageDetails.setlistDetail.feature6}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* 楽曲管理 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LibraryMusic sx={{ mr: 2, color: 'info.main' }} />
                  <Typography variant="h6">
                    {messages.pages.guide.pageDetails.songManagement.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  <strong>{messages.auth.authRequired}:</strong>{' '}
                  {messages.pages.guide.pageDetails.songManagement.description}
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.songManagement.feature1}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.songManagement.feature2}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.songManagement.feature3}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.songManagement.feature4}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.songManagement.feature5}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* セットリスト作成 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PlaylistAdd sx={{ mr: 2, color: 'warning.main' }} />
                  <Typography variant="h6">
                    {messages.pages.guide.pageDetails.setlistCreation.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  <strong>{messages.auth.authRequired}:</strong>{' '}
                  {messages.pages.guide.pageDetails.setlistCreation.description}
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature1}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature2}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature3}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature4}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature5}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature6}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.setlistCreation.feature7}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* プロフィール */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountCircle sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6">
                    {messages.pages.guide.pageDetails.profile.title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  <strong>{messages.auth.authRequired}:</strong>{' '}
                  {messages.pages.guide.pageDetails.profile.description}
                </Typography>
                <List dense>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.profile.feature1}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.profile.feature2}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.profile.feature3}`}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`• ${messages.pages.guide.pageDetails.profile.feature4}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
