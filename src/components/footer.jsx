import React, { Component } from 'react';
import '../styles/footer.css';

class Footer extends Component {
    state = {  }
    render() { 
        return (
            <div className="footer pageBlock">
                <ul className="socialNetworks">
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onTwitter contentAttached" href="#">
                            <span className="icon TwitterIcon"></span>
                            <span className="content">Твитнуть</span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onGoogle" href="#">
                            <span className="icon GoogleIcon"></span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onPinterest" href="#">
                            <span className="icon PinterestIcon"></span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onSkype" href="#">
                            <span className="icon SkypeIcon"></span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onYoutube" href="#">
                            <span className="icon YoutubeIcon"></span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onFacebook contentAttached" href="#">
                            <span className="icon FacebookIcon"></span>
                            <span className="content">Поделиться 176</span>
                        </a>
                    </li>
                    <li className="socialNetwork">
                        <a className="socialNetworkLink onVemio contentAttached" href="#">
                            <span className="icon VemioIcon"></span>
                            <span className="content">Отправить</span>
                        </a>
                    </li>
                </ul>
                <div className="iconsAuthor">
                    Icons made by <a className="darkgoldenrodText noUnderline" href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons </a> 
                    from <a className="darkgoldenrodText noUnderline" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com </a> 
                    is licensed by <a className="darkgoldenrodText noUnderline" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                </div>
            </div>
        );
    }
}
 
export default Footer;