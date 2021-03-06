import React, { useCallback, memo } from 'react'

import { useAsync } from 'react-async'

import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  CircularProgress,
} from '@material-ui/core'

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'

import * as usersApi from 'api/users'

import whatsapp from 'assets/whatsapp.svg'
import { useParams, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4, 40),
    },
  },

  img: {
    height: '400px',
    width: '400px',
  },

  boxHeader: {
    marginBottom: theme.spacing(2),
  },

  title: {
    fontWeight: theme.typography.fontWeightBold,
  },

  boxWhatsApp: {
    padding: theme.spacing(2),
  },

  boxActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}))

const WhatsAppIcon = memo(() => {
  return <img src={whatsapp} alt="WhatsApp" width="25px" />
}, [])

const EntrepreneurialDetail = memo(() => {
  const { id } = useParams()

  const history = useHistory()
  const classes = useStyles()

  const { data: user, isLoading } = useAsync(usersApi.findUserById, { id })

  const formatWhatsAppLink = useCallback((telefone, nome) => {
    return `https://api.whatsapp.com/send?phone=${telefone}&text=Olá ${nome}! Tudo bem?`
  }, [])

  return (
    <>
      {isLoading && <CircularProgress />}

      {!isLoading && user && (
        <Card className={classes.main}>
          <Box className={classes.box}>
            <Box className={classes.boxHeader}>
              <Typography variant="h5" className={classes.title}>
                {user.nome}
              </Typography>
            </Box>

            <CardActionArea>
              <img
                className={classes.img}
                alt={user.nome}
                src={`https://source.unsplash.com/1600x900/?woman-face${user.id}`}
              />
            </CardActionArea>

            <CardContent>
              <Box>
                <Typography variant="subtitle2">{user.uf}</Typography>
                <Typography variant="subtitle2">{user.email}</Typography>
                <Typography variant="subtitle2">{user.profissao}</Typography>
              </Box>
            </CardContent>
          </Box>

          <CardActions className={classes.boxActions}>
            <Box className={classes.boxWhatsApp}>
              <Button
                variant="outlined"
                onClick={() => history.push('/admin/entrepreneurial')}
                startIcon={<ArrowBackIosOutlinedIcon />}
              >
                Voltar
              </Button>
            </Box>

            <Box className={classes.boxWhatsApp}>
              <a href={formatWhatsAppLink(user.telefone, user.nome)} rel="noopener noreferrer" target="_blank">
                <Button fullWidth variant="outlined" startIcon={<WhatsAppIcon />}>
                  Conversar
                </Button>
              </a>
            </Box>
          </CardActions>
        </Card>
      )}
    </>
  )
})

export default EntrepreneurialDetail
