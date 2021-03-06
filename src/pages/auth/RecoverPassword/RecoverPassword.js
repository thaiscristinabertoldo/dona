import React, { useMemo, useCallback, memo } from 'react'

import { useHistory } from 'react-router-dom'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Button, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core'

import { HeaderAuth } from 'components/HeaderAuth'
import { useSnackbar } from 'utils'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  divCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: '4px',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    },
  },
  cardContainer: {
    padding: theme.spacing(0, 2, 2, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const RecoverPassword = memo(() => {
  const { createSnackbar } = useSnackbar()

  const classes = useStyles()
  const history = useHistory()

  const handleSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      createSnackbar({
        message: 'Em desenvolvimento',
        theme: 'error',
        pauseOnHover: true,
      })
      resetForm({})
      setSubmitting(false)
    },
    [createSnackbar]
  )

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
    })
  }, [])

  return (
    <div className={classes.divCard}>
      <HeaderAuth title="Recuperar senha" />

      <CardContent className={classes.cardContainer}>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{ email: '' }}>
          {({ isSubmitting, isValid }) => (
            <Form noValidate className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    name="email"
                    fullWidth
                    label="E-mail"
                    required
                    component={TextField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className={classes.submit}
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting || !isValid}
                  >
                    Confirmar
                  </Button>
                </Grid>
                {isSubmitting && (
                  <Grid item>
                    <CircularProgress size="2rem" />
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>

        <Grid container spacing={2}>
          <Grid item xs>
            <Button color="primary" size="small" onClick={() => history.push('/auth/login')}>
              voltar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  )
})

export default RecoverPassword
