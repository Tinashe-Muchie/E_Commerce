import React, {useState, useContext} from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import PaymentIcon from '@material-ui/icons/Payment'
import {StepConnector, Stepper, Step, StepLabel, Typography} from '@material-ui/core'
import clsx from 'clsx'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import {Link} from 'react-router-dom'
import {Context} from '../Context/Context'
import {Spinner, Button, ListGroup} from 'react-bootstrap'

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector)
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  })
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <HomeIcon />,
      2: <PaymentIcon />,
    }
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    )
  }

  const useStyles = makeStyles((theme) => ({
    root: { width: '50%' },
    button: { marginRight: theme.spacing(20) },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }))

  function getSteps() {
    return ['Shipping Address', 'Payment Details']
  } 

function Checkout() {
    
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const [isDone, setIsDone] = useState(false)
    const {order, error} = useContext(Context)
    const steps = getSteps()

    const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1)}
    const handleBack = () => {setActiveStep((prevActiveStep) => prevActiveStep - 1)}

    const next = (data) => {
      setShippingData(data)
      handleNext()
    }
    const timeout = () => {
      setTimeout(()=>{
        setIsDone(true)
      }, 5000)
    }

    let Confirmation = () => (
        (order.customer)
      ? <>
          <div>
            <span> Thank you for the purchase, {order.customer.firstname} {order.customer.lastname} </span>
            <span> Order ref: {order.customer_reference}</span>
          </div><br />
          <div>
            <Link to="/">
              <Button type="button" className="secondary">Back to Home</Button>
            </Link>
          </div>
        </>
      : (isDone)
      ? <>
            <ListGroup>
              <ListGroup.Item>
                <div>
                  <span> Thank you for the purchase. </span>
                </div><hr />
                <div>
                  <Link to="/">
                    <Button type="button" variant="secondary">Back to Home</Button>
                  </Link>
                </div>
              </ListGroup.Item>
            </ListGroup>  
        </>
      : <div className="loading-position">
          <Spinner animation="border" style={{color: '#C5C6C7'}} />
        </div>
    )

    if(error) {
      <>
        <div>`Error: ${error}`</div><br />
        <div>
            <Link to="/">
              <Button type="button" className="secondary">Back to Home</Button>
            </Link>
        </div>
      </>
    }

    function getStepContent(step) {
      switch (step) {
        case 0:
          return <AddressForm next={next} />
        case 1:
          return <PaymentForm 
                  shippingData={shippingData} 
                  handleBack={handleBack} 
                  handleNext={handleNext}
                  timeout={timeout} 
                  />
        case 2:
          return <Confirmation />
        default:
          return 'Unknown step'
      }
    }
    
    return(
      <div className="checkout-wrapper">
        <div className={classes.root}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
              ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  <Confirmation />
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              </div>
          )}
          </div>
      </div>
    </div>
    )
}

export default Checkout