import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Assignment,
  Notifications,
  Settings,
  Analytics,
  Schedule,
  CheckCircle,
  Star,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  Launch,
  Add,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import StatsCard from '../components/StatsCard';
import AnimatedCounter from '../components/AnimatedCounter';

const Dashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [animationDelay, setAnimationDelay] = React.useState(0);

  // Mock data for demonstration
  const stats = React.useMemo(() => [
    { 
      title: 'Total Revenue', 
      value: '$12,426', 
      change: '+12.5%', 
      trend: 'up', 
      icon: TrendingUp,
      color: theme.palette.success?.main || '#22c55e',
      bgColor: alpha(theme.palette.success?.main || '#22c55e', 0.1)
    },
    { 
      title: 'Active Users', 
      value: '1,234', 
      change: '+8.2%', 
      trend: 'up', 
      icon: People,
      color: theme.palette.primary?.main || '#0ea5e9',
      bgColor: alpha(theme.palette.primary?.main || '#0ea5e9', 0.1)
    },
    { 
      title: 'Projects', 
      value: '42', 
      change: '-2.1%', 
      trend: 'down', 
      icon: Assignment,
      color: theme.palette.warning?.main || '#f59e0b',
      bgColor: alpha(theme.palette.warning?.main || '#f59e0b', 0.1)
    },
    { 
      title: 'Notifications', 
      value: '18', 
      change: '+5.4%', 
      trend: 'up', 
      icon: Notifications,
      color: theme.palette.info?.main || '#0ea5e9',
      bgColor: alpha(theme.palette.info?.main || '#0ea5e9', 0.1)
    },
  ], [theme]);

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', icon: People },
    { id: 2, action: 'Project "Alpha" completed', time: '1 hour ago', icon: CheckCircle },
    { id: 3, action: 'Revenue milestone reached', time: '3 hours ago', icon: Star },
    { id: 4, action: 'System maintenance scheduled', time: '1 day ago', icon: Schedule },
  ];

  const quickActions = [
    { title: 'Create Project', icon: Add, color: 'primary' },
    { title: 'View Analytics', icon: Analytics, color: 'secondary' },
    { title: 'Settings', icon: Settings, color: 'default' },
    { title: 'Launch App', icon: Launch, color: 'success' },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimationDelay(prev => prev + 200);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      {/* Welcome Header */}
      <Fade in timeout={800}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64, 
                mr: 3,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Welcome back, {user?.firstName}! 👋
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Here's what's happening with your account today
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Grow in timeout={800 + index * 200}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                  border: `1px solid ${alpha(stat.color, 0.2)}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: stat.color,
                        color: '#ffffff',
                      }}
                    >
                      <stat.icon />
                    </Box>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <AnimatedCounter 
                    end={parseInt(stat.value.replace(/[^0-9]/g, '')) || 0}
                    prefix={stat.value.includes('$') ? '$' : ''}
                    suffix={stat.value.includes(',') ? '' : ''}
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                  />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {stat.trend === 'up' ? (
                      <ArrowUpward sx={{ color: 'success.main', fontSize: 16 }} />
                    ) : (
                      <ArrowDownward sx={{ color: 'error.main', fontSize: 16 }} />
                    )}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: stat.trend === 'up' ? 'success.main' : 'error.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {stat.change}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Account Overview */}
        <Grid item xs={12} lg={8}>
          <Fade in timeout={1200}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Account Overview
                  </Typography>
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Profile Completion
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={85} 
                          sx={{ 
                            flexGrow: 1, 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary?.main || '#0ea5e9', 0.1)
                          }} 
                        />
                        <Typography variant="body2" fontWeight="bold">85%</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Storage Used
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={62} 
                          color="warning"
                          sx={{ 
                            flexGrow: 1, 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.warning?.main || '#f59e0b', 0.1)
                          }} 
                        />
                        <Typography variant="body2" fontWeight="bold">62%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary?.main || '#0ea5e9', 0.05), borderRadius: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>Account Details</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Email: {user?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Role: <Chip label={user?.role} size="small" color="primary" />
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Status: {user?.emailVerified ? 
                          <Chip label="Verified" size="small" color="success" /> : 
                          <Chip label="Pending" size="small" color="warning" />
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Member since: {new Date(user?.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Fade in timeout={1400}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={6} key={action.title}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color={action.color}
                        startIcon={<action.icon />}
                        sx={{ 
                          py: 2,
                          flexDirection: 'column',
                          gap: 1,
                          borderRadius: 2,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                          }
                        }}
                      >
                        <Typography variant="caption">
                          {action.title}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Fade in timeout={1600}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem>
                        <ListItemIcon>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: '50%',
                              bgcolor: alpha(theme.palette.primary?.main || '#0ea5e9', 0.1),
                              color: 'primary.main',
                            }}
                          >
                            <activity.icon sx={{ fontSize: 20 }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.time}
                        />
                      </ListItem>
                      {index < recentActivities.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;