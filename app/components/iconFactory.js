import FaFacebook from 'react-icons/lib/fa/facebook'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaPhone from 'react-icons/lib/fa/phone'
import FaEnvelope from 'react-icons/lib/fa/envelope'
import FaSkype from 'react-icons/lib/fa/skype'
import MdFlight from 'react-icons/lib/md/flight'
import MdLocalAtm from 'react-icons/lib/md/local-atm'
import MdNetworkCheck from 'react-icons/lib/md/network-check'
import MdMoreVert from 'react-icons/lib/md/more-vert'
import MdAccountCircle from 'react-icons/lib/md/account-circle'
import MdSend from 'react-icons/lib/md/send'

const iconMap  =new Map([
    ['facebook', FaFacebook],
    ['linkedIn', FaLinkedin],
    ['twitter', FaTwitter],
    ['phone', FaPhone],
    ['mailTo', FaEnvelope],
    ['skype', FaSkype],
    ['flight', MdFlight],
    ['low_fees', MdLocalAtm],
    ['delivery_speed', MdNetworkCheck],
    ['more_vert', MdMoreVert],
    ['account_circle', MdAccountCircle],
    ['send', MdSend]
])

export default function(key){
    if(!iconMap.has(key)){
        throw new TypeError(`No icon for a given key ${key} exists`)
    }
    return iconMap.get(key)
}