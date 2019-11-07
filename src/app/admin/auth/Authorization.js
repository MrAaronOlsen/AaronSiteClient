import React from 'react';
import Authentication from './Authentication.js'

import App from '../app/App.js'

const Authorization = (allowedRoles) =>
  (WrappedComponent) => {
    return class WithAuthorization extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          gotResponse: false,
          role: ""
        }
      }

      componentDidMount() {
        Authentication.getCurrentUser((user) => {

          if (user.valid) {
            this.setState({
              gotResponse: true,
              role: user.role
            })
          } else {
            this.setState({
              gotResponse: true,
              role: ""
            })
          }
        })
      }

      authorize() {
        if (this.state.gotResponse) {
          var role = this.state.role

          if (role && allowedRoles.includes(role)) {
            return <WrappedComponent {...this.props} />
          } else {
            return <App />
          }
        } else {
          return null
        }
      }

      render() {
        return this.authorize()
      }
    }
}

export default Authorization;