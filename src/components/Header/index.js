import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { BsMoon,BsBrightnessHigh } from 'react-icons/bs'
import AppTheme from '../../context/AppTheme'
import './index.css'

const navItemsList = [
  {
    id: 'HOME',
    name: 'Home',
    link: '/',
  },
  {
    id: 'CART',
    name: 'Cart',
    link: '/cart',
  },
]

class Header extends Component {
  state = {
    showMobileView: false,
  }

  onLogOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickOpen = () => {
    this.setState({showMobileView: true})
  }

  onClickClose = () => {
    this.setState({showMobileView: false})
  }

  onMobileNav = () => {
    this.setState({showMobileView: false})
  }

  render() {
    const {showMobileView} = this.state

    return (
      <AppTheme.Consumer>
        {value=>{
          const {activeTheme,changeTheme}=value

          const onChangeTheme = () => {
            const theme = activeTheme === 'light' ? 'dark' : 'light'
            changeTheme(theme)
          }

          const navBg=activeTheme==="light"?"#f8fafc":"#313131"
          const navLinksColor=activeTheme==="light"?"normal-nav-item-style":"dark-nav-item-style"
          const closeIcon=activeTheme==="light"?"#334155":"#ffffff"


          return(

            <>
        <nav className="navbar-container" style={{backgroundColor:`${navBg}`}}>
          <div className="navbar-item-container">
            <Link to="/" className="nav-links">
              <div className="header-logo-container">
                <img
                  src="https://res.cloudinary.com/dpjowvn70/image/upload/v1674121630/Frame_274_1x_tl2jpu.png"
                  alt="website logo"
                  className="header-logo"
                />
                <h1 className="header-heading">Foodies World</h1>
              </div>
            </Link>
            <ul className="nav-items-list">
              {navItemsList.map(eachItem => (
                <li className="list-item" key={eachItem.id}>
                  <Link to={eachItem.link} className="header-links">
                    <p className={navLinksColor}  >{eachItem.name}</p>
                  </Link>
                </li>
              ))}
              <button
                  border="none"
                  onClick={onChangeTheme}
                  className='theme-btn-desktop'
                >
                  {activeTheme === 'light' ? (
                    <BsMoon size={28} />
                  ) : (
                    <BsBrightnessHigh size={28} color="#ffffff" />
                  )}
                </button>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogOut}
                >
                  Logout
                </button>
            </ul>
            <button
                  border="none"
                  onClick={onChangeTheme}
                  className='theme-btn-mobile'
                >
                  {activeTheme === 'light' ? (
                    <BsMoon size={25} />
                  ) : (
                    <BsBrightnessHigh size={25} color="#ffffff" />
                  )}
                </button>
            <button
              type="button"
              className="hamburger-icon-btn"
              onClick={this.onClickOpen}
            >
              {activeTheme === 'light' ? (
                    <GiHamburgerMenu size={28} />
                  ) : (
                    <GiHamburgerMenu size={28} color="#ffffff" />
                  )}
            </button>
          </div>
        </nav>

        <nav className="mobile-view" style={{backgroundColor:`${navBg}`}} >
          {showMobileView ? (
            <>
              {' '}
              <ul className="mobile-items-list">
                {navItemsList.map(eachItem => (
                  <li
                    className="list-item"
                    key={eachItem.id}
                    onClick={this.onMobileNav}
                  >
                    <Link to={eachItem.link} className="header-links">
                      <p className={navLinksColor}>{eachItem.name}</p>
                    </Link>
                  </li>
                ))}
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogOut}
                >
                  Logout
                </button>
              </ul>
              <button
                type="button"
                className="close-icon-btn"
                onClick={this.onClickClose}
              >
                <AiFillCloseCircle className="close-icon" style={{color:`${closeIcon}`}} />
              </button>{' '}
            </>
          ) : (
            ''
          )}
        </nav>
      </>

          )
        }}
      </AppTheme.Consumer>
      
    )
  }
}

export default withRouter(Header)


