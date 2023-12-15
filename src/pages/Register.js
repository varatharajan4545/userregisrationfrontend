import {
    Alert,
    Box,
    Button,
    Grid,
    Link,
    Stack,
    Typography,Autocomplete
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../componets/inputcontrols/FormikControl';
import { useEffect, useState } from 'react';
import countryList from '../utils/country';
import stateList from '../utils/countrystate';
import { registerUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    useEffect(() => {
        if (localStorage.getItem('loggedInAdmin')) {
            localStorage.clear();
        }
    }, []);

    const [errorMsg, setErrorMsg] = useState('');
    const [countryOptions, setCountryOptions] = useState(countryList);
    const [stateOptions, setStateOptions] = useState([]);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate()
    const [initialValues] = useState({
        email: '',
        password: '',
        userName:'',
        confirmPassword:'',
        firstName:'',
        lastName:'',
        dob:'',
        phoneNumber:'',
        mobileNumber:'',
        country:'',
        state:''
        


    });

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address!')
            .matches(/^[a-zA-Z0-9](.?)+@[a-zA-Z0-9]+.[A-Za-z]+$/, 'Invalid Email Address!')
            .required('Email cannot be blank'),
        password: Yup.string().required('Password is required'),
        userName:Yup.string().required('Password is required'),
        confirmPassword:Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
        firstName:Yup.string().required('First Name is required'),
        lastName:Yup.string().required('Last Name is required'),
        dob:Yup.string().required('Date is required'),
        phoneNumber:Yup.string().required('Phone Number is required'),
        mobileNumber:Yup.string().required('Mobile Number is required'),
        country:Yup.string().required('Country is required'),
        state:Yup.string().required('State is required')
    });
const stateChangeOption=(country)=>{
        const states=stateList.filter((item)=>item.country_name===country)

        setStateOptions(states[0]?.state ? states[0]?.state : [] )
        setState('')
}
    const onSubmit = async (values,{ setErrors ,setSubmitting}) => {
      const { confirmPassword,...rest } = values;
      const input = {
        ...rest,
      };
      setSubmitting(true)
      registerUser(input).then(
        (response) => {
            navigate('/');
        },
        (error) => {
            console.log(error)
          setErrors(error?.data?.error || {})
          
        }
      );
      setSubmitting(false)
    };
    return (
        <Box sx={{display:'flex'}}>
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
                        display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant="body1"
                            gutterBottom
                            noWrap
                            sx={{
                                fontWeight: 700,
                                fontSize: 28,
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                color: 'white',
                                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",Work Sans'
                            }}
                        >
                            User Registration Portal
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Grid container>
                        <Grid item xs={12} sx={{ ml: '35px', mt: '10px' }}>
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
                                Register 
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => (
                                    <Form id="userregistration">
                                        <Grid
                                            container
                                            rowSpacing={1}
                                            columnSpacing={1}
                                            justifyContent="center"
                                            sx={{ p: 2 }}
                                        >
                                            <Grid item xs={12} sx={{ mb: 1 }}>
                                                <Stack sx={{ width: '100%' }}>
                                                    {errorMsg && (
                                                        <Alert severity="error">{errorMsg}</Alert>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="firstName"
                                                    label="First Name"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type='text'
                                                    name="lastName"
                                                    label="Last Name"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="userName"
                                                    label="UserName"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="password"
                                                    name="password"
                                                    label="Password"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="password"
                                                    name="confirmPassword"
                                                    label="Confirm Password"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="date"
                                                    name="dob"
                                                    label="Date"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    name="email"
                                                    label="Email"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                            <Autocomplete
                              options={countryOptions}
                              value={country}
                              isOptionEqualToValue={(option, value) =>
                                option === value
                              }
                              onChange={(event, value) => {
                                formik.setFieldValue('country', value);
                                formik.setFieldValue('state', '');
                                setCountry(value);
                                
                                if (value) {
                                  stateChangeOption(value)
                                  setErrorMsg('');
                                }
                              }}
                              renderInput={(params) => (
                                <>
                                  <FormikControl
                                    control="search"
                                    {...params}
                                    name="country"
                                    label={'Country'}
                                    InputProps={{
                                      ...params.InputProps,
                                      type: 'search'
                                    }}
                                  />
                                </>
                              )}
                            />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                            <Autocomplete
                              options={stateOptions}
                              value={state}
                              isOptionEqualToValue={(option, value) =>
                                option === value
                              }
                              onChange={(event, value) => {
                                formik.setFieldValue('state', value);
                                setState(value);
                                
                                if (value) {
                                  setErrorMsg('');
                                }
                              }}
                              renderInput={(params) => (
                                <>
                                  <FormikControl
                                    control="search"
                                    {...params}
                                    name="state"
                                    label={'State'}
                                    InputProps={{
                                      ...params.InputProps,
                                      type: 'search'
                                    }}
                                  />
                                </>
                              )}
                            />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="phoneNumber"
                                                    label="Phone Number"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="mobileNumber"
                                                    label="Mobile Number"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                                <Button
                                                disabled={formik.isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ marginY: '20px' }}
                                                size='small'
                                                >
                                                    Sign Up
                                                </Button>
                                            </Grid>
                                            <Grid item alignContent="left">
                                                <Link
                                                    href="/"
                                                    variant="body2"
                                                    underline="none"
                                                >
                                                    LogIn
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

export default Register;
