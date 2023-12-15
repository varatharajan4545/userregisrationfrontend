import {
    Alert,
    Box,
    Button,
    Grid,
    InputLabel,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../componets/inputcontrols/FormikControl';
import { useEffect, useState } from 'react';
import { logIn } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    borderRadius: '8px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)'
};


const SignIn = (props) => {
    const {login} = useAuth()
    useEffect(() => {
        if (localStorage.getItem('user')) {
            localStorage.clear();
        }
    }, []);

    const [errorMsg, setErrorMsg] = useState('');
    const [initialValues] = useState({
        userName: '',
        password: ''
    });

    const validationSchema = Yup.object({
        userName: Yup.string().required('Email cannot be blank'),
        password: Yup.string().required('Password is required')
    });

    const onSubmit = async (values) => {
      logIn(values).then(
        (response) => {
        login(response.user)
        },
        (error) => {
          console.log(error)
          setErrorMsg(error?.data?.message)
        }
      );
    };
    return (
        <Box sx={style}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{
                        backgroundColor: 'purple',
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Box sx={{ ml: '40px', mt: '60px' }}>
                        <Typography
                            variant="body1"
                            gutterBottom
                            noWrap
                            sx={{
                                fontWeight: 700,
                                fontSize: 28,
                                color: 'white',
                                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",Work Sans'
                            }}
                        >
                            User Registration Portal
                        </Typography>
                    </Box>
                </Grid>
                <Grid item  xs={12}
                    md={6}
                    lg={6}>
                    <Grid container>
                        <Grid item xs={12} sx={{ ml: '35px', mt: '60px' }}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                noWrap
                                sx={{
                                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",Work Sans',
                                    fontWeight: 700,
                                    fontSize: 28
                                }}
                            >
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {() => (
                                    <Form id="PasswordVerification">
                                        <Grid
                                            container
                                            rowSpacing={1}
                                            columnSpacing={1}
                                            justifyContent="center"
                                            sx={{ p: 4 }}
                                        >
                                            <Grid item xs={12} sx={{ mb: 1 }}>
                                                <Stack sx={{ width: '100%' }}>
                                                    {errorMsg && (
                                                        <Alert severity="error">{errorMsg}</Alert>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",Work Sans',
                                                        fontWeight: 700,
                                                        fontSize: 16,
                                                        mb: '8px'
                                                    }}
                                                >
                                                    User Name
                                                </InputLabel>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="userName"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel
                                                    sx={{
                                                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",Work Sans',
                                                        fontWeight: 700,
                                                        fontSize: 16,
                                                        mb: '8px'
                                                    }}
                                                >
                                                    Password
                                                </InputLabel>
                                                <FormikControl
                                                    control="input"
                                                    type="password"
                                                    name="password"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ marginY: '20px' }}
                                                >
                                                    Sign In
                                                </Button>
                                            </Grid>
                                            <Grid item alignContent="left">
                                                <Link
                                                    href="/register"
                                                    variant="body2"
                                                    underline="none"
                                                >
                                                    register
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignIn;
