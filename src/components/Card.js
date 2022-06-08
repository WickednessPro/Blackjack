import React from 'react';
import '../App.css'
import Back from '../assets/back.png'
// import { ReactComponent as NBack } from '../assets/back.png';
// import { library } from '@fortawesome/fontawesome-svg-core'
import { ReactComponent as Clubs } from '../assets/club.svg'
import { ReactComponent as Hearts } from '../assets/heart.svg'
import { ReactComponent as Diamonds } from '../assets/diamond.svg'
import { ReactComponent as Spades } from '../assets/spade.svg'
// import { faHeart, faClub, faDiamond, faSpade } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// library.add(faHeart, faClub, faDiamond, faSpade)

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            type: this.props.type
        }
    }

    async componentDidMount() {
        this.setState({loading: false});
        // alert(this.state.type)
        // console.log(this.props.double)
    }

    render() {
        return (
            <div id="card" className="flex mt-10">
                <div className="w-32 h-48 bg-white rounded-lg flip">
                    <div id="face-content" className="bg-white rounded-lg">
                        {(() => {
                            if (this.props.flipped === true) {
                                return(
                                    <div id="back" className="z-50 inline">
                                        <img src={Back} className="object-fit w-32 h-48" />
                                        {/* <NBack className="object-fit w-32 h-48" /> */}
                                    </div>
                                )
                            } else {
                                if(this.props.double === false) {
                                    return <span className="text-black text-left text-3xl font-semibold ml-5 mt-2 absolute">{this.props.number}</span>
                                } else {
                                    return <span className="text-black text-left text-3xl font-semibold ml-3.5 mt-2 absolute">{this.props.number}</span>
                                }
                            }
                        })()}
                        {(() => {
                            if (!this.props.flipped === true) {
                                if (this.props.type === 'hearts') {
                                    return <Hearts className="absolute card-red h-8 ml-3 mt-12" />
                                }
                                if (this.props.type === 'spades') {
                                    return <Spades className="absolute card-black h-8 ml-3 mt-12" />
                                }
                                if (this.props.type === 'clubs') {
                                    return <Clubs className="absolute card-black h-8 ml-3 mt-12" />
                                }
                                if (this.props.type === 'diamonds') {
                                    return <Diamonds className="absolute card-red h-8 ml-3 mt-12" />
                                }
                            }
                        })()}
                    </div>
                    {/* <div id="back" className="z-50 inline object-fill">
                        <img src={Back} className="object-fill w-36 h-48" />
                    </div> */}
                </div>
                {/* <div id="back" className="z-50 inline">
                    <img src={Back} className="object-fill w-36 h-48" />
                </div> */}
            </div>
        )
    }
}