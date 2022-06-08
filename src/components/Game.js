import React from 'react';
import Card from './Card';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dealersHand: [],
            playersHand: [],
            count: 0,
            dealerCount: 0,
        }
        this.dealersHands = React.createRef();
        this.playersHands = React.createRef();
        this.hit = this.hit.bind(this);
        this.newgame = this.newgame.bind(this);
        this.hitBTN = React.createRef();
        // this.split = React.createRef();
        this.stand = React.createRef();
        this.standClick = this.standClick.bind(this);
        this.newgameBtn = React.createRef();
    }

    async newgame(e) {
        this.hitBTN.current.classList.remove('hidden');
        // this.split.current.classList.remove('hidden');
        this.stand.current.classList.remove('hidden');
        this.stand.current.removeAttribute('disabled');
        this.newgameBtn.current.classList.add('hidden');
        var oldarr = this.state.playersHand;
        var dealersarr = this.state.dealersHand;
        // Summon Cards
        async function SummonCard() {
            var randomNumber = Math.floor(Math.random() * 11) + 1;
            var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
            function isDouble(x) {
                if (x.toString().length === 2) {
                    return true;
                } else {
                    return false;
                }
            }

            if (randomNumber === 11) {
                // Summon Ace card
                var newInput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber), ace: true }
                oldarr.push(newInput)
                return oldarr;
            } else {
                var newInput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber) }
                oldarr.push(newInput)
                return oldarr;
                // console.log(oldarr)
            }
        }
        async function SummonDealersCard(val) {
            let randomNumber = Math.floor(Math.random() * 11) + 1;
            var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
            function isDouble(x) {
                if (x.toString().length === 2) {
                    return true;
                } else {
                    return false;
                }
            }

            if (randomNumber === 11) {
                // Summon Ace card
                var dinput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber), ace: true, flipped: val }
                dealersarr.push(dinput)
                return dealersarr;
            } else {
                var dinput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber), flipped: val }
                dealersarr.push(dinput)
                return dealersarr;
                // console.log(oldarr)
            }
        }
        SummonCard().then((result) => {
            console.log(result);
            this.setState({ playersHand: result });
            this.playersHands.current.classList.add(`grid-cols-${this.state.playersHand.length}`);
            var count;
            this.state.playersHand.map( async (hand) => {
                this.setState({count: this.state.count + hand.num})
                count = this.state.count + hand.num
            });
            SummonCard().then((r2) => {
                console.log(r2);
                this.setState({ playersHand: r2 });
                this.playersHands.current.classList.add(`grid-cols-${this.state.playersHand.length}`);
                var count;
                this.state.playersHand.map( async (hand) => {
                    this.setState({count: this.state.count + hand.num})
                    count = this.state.count + hand.num
                });
            });
        });
        
        // Summon Dealers Card
        SummonDealersCard(false).then((result) => {
            // console.log(result);
            this.setState({ dealersHand: result });
            var count;
            this.state.dealersHand.map( async (hand) => {
                this.setState({ dealerCount: this.state.dealerCount + hand.num })
                count = this.state.dealerCount + hand.num
            });
            SummonDealersCard(true).then((r2) => {
                console.log(`Dealers Cards: `, r2);
                this.setState({ dealersHand: r2 });
                this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
                // var count;
                // this.state.dealersHand.map( async (hand) => {
                //     this.setState({ dealerCount: this.state.dealerCount + hand.num })
                //     count = this.state.dealerCount + hand.num
                // });
            });
        });
    }

    async standClick(e) {
        var count;
        this.state.dealersHand.map( async (hand) => {
            this.setState({dealerCount: this.state.dealerCount + hand.num})
            count = this.state.dealerCount + hand.num
        });
        // console.log('click')
        for (var i = 0; i < this.state.dealersHand.length; i++) {
            if (this.state.dealersHand[i].flipped === true) {
                var cloneEntry = this.state.dealersHand[i];
                var cloneArr = this.state.dealersHand;
                console.log('found');
                cloneArr.splice(i, 1)
                this.setState({ dealersHand: cloneArr})
                console.log(cloneEntry)
                cloneEntry.flipped = false;
                this.state.dealersHand.push(cloneEntry)
            }
        }
        this.stand.current.setAttribute('disabled', 'disabled');

        var dealersarr = this.state.dealersHand;
        async function SummonDealersCard(val) {
            let randomNumber = Math.floor(Math.random() * 11) + 1;
            var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
            function isDouble(x) {
                if (x.toString().length === 2) {
                    return true;
                } else {
                    return false;
                }
            }

            if (randomNumber === 11) {
                // Summon Ace card
                var dinput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber), ace: true, flipped: val }
                dealersarr.push(dinput)
                return dealersarr;
            } else {
                var dinput = { type: suits[Math.floor(Math.random() * suits.length)], value: randomNumber, num: randomNumber, double: isDouble(randomNumber), flipped: val }
                dealersarr.push(dinput)
                return dealersarr;
            }
        }

        if (this.state.dealerCount < 17) {
            console.log('hit ' + this.state.dealerCount)
        }

        // for (var j = 0; j < 5; j++) {
        //     console.log(count)
        //     if (count < 17) {
        //         // console.log('under 17');
        //         SummonDealersCard(false).then((r4) => {
        //             // console.log(result);
        //             this.setState({ dealersHand: r4 });
        //             this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
        //             this.state.dealersHand.map( async (hand) => {
        //                 this.setState({ dealerCount: this.state.dealerCount + hand.num })
        //                 count = this.state.dealerCount + hand.num;
        //             });
        //         });
        //         // j=-1;continue;

        //     }
        // }

        // if (this.state.dealerCount < 17) {
        //     // Dealer Hit.
        //     SummonDealersCard(false).then((result) => {
        //         // console.log(result);
        //         this.setState({ dealersHand: result });
        //         this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
        //         this.state.dealersHand.map( async (hand) => {
        //             this.setState({ dealerCount: this.state.dealerCount + hand.num })
        //         });
        //         if (this.state.dealerCount < 17) {
        //             SummonDealersCard(false).then((r2) => {
        //                 // console.log(result);
        //                 this.setState({ dealersHand: r2 });
        //                 this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
        //                 this.state.dealersHand.map( async (hand) => {
        //                     this.setState({ dealerCount: this.state.dealerCount + hand.num })
        //                 });
        //                 if (this.state.dealerCount < 17) {
        //                     SummonDealersCard(false).then((r3) => {
        //                         // console.log(result);
        //                         this.setState({ dealersHand: r3 });
        //                         this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
        //                         this.state.dealersHand.map( async (hand) => {
        //                             this.setState({ dealerCount: this.state.dealerCount + hand.num })
        //                         });
        //                         if (this.state.dealerCount < 17) {
        //                             SummonDealersCard(false).then((r4) => {
        //                                 // console.log(result);
        //                                 this.setState({ dealersHand: r4 });
        //                                 this.dealersHands.current.classList.add(`grid-cols-${this.state.dealersHand.length}`);
        //                                 this.state.dealersHand.map( async (hand) => {
        //                                     this.setState({ dealerCount: this.state.dealerCount + hand.num })
        //                                 });
        //                             });
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // }
    }

    async hit(e) {
        // test: add card to dealers deck
        var oldarr = this.state.playersHand;
        this.playersHands.current.classList.remove(`grid-cols-${oldarr.length}`)
        var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        var num = Math.floor(Math.random() * 11) + 1
        function isDouble(x) {
            if (x.toString().length === 2) {
                return true;
            } else {
                return false;
            }
        }
        var newInput = { type: suits[Math.floor(Math.random() * suits.length)], value: num, num: num, double: isDouble(num) }
        oldarr.push(newInput)
        this.setState({ playersHand: oldarr});
        this.playersHands.current.classList.add(`grid-cols-${this.state.playersHand.length}`);

        var count;

        // update card count
        this.state.playersHand.map( async (hand) => {
            this.setState({count: this.state.count + hand.num})
            count = this.state.count + hand.num
        });

        if (count > 21) {
            this.hitBTN.current.disabled = true
            this.stand.current.disabled = true
            this.standClick()
        }
    }

    async componentDidMount() {
        this.setState({loading: false});
    }

    render() {
        return(
            <div className="grid grid-rows-3 w-full">
                <div id="dealers" className="flex relative inset-x-0 bottom-0 justify-center w-full h-full">
                    <h1 className="absolute flex text-center mt-5">Dealers Hand - {(() => {
                        if (this.state.dealerCount > 21) {
                            return <span className="text-red-500 ml-2"> Bust ({this.state.dealerCount})</span>
                        } else if (this.state.dealerCount === 21) {
                            return <span className="text-green-500 ml-2"> Blackjack! ({this.state.count})</span>
                        } else { return this.state.dealerCount }
                    })()}</h1>
                    <div ref={this.dealersHands} className="mt-10 relative grid grid-rows-1 gap-4">
                        {this.state.dealersHand.map((hand) => {
                            // console.log(hand)
                            return <Card type={hand.type} number={hand.num} value={hand.value} double={hand.double} flipped={hand.flipped} id={hand.id} />
                        })}
                    </div>
                </div>
                <div id="actions" className="w-full flex relative justify-center h-24 mt-24 gap-4">
                    <button ref={this.hitBTN} onClick={(e) => { this.hit(e)}} className="hidden bg-slate-900 w-32 rounded-md disabled:bg-gray-800">Hit</button>
                    {/* <button ref={this.split} className="hidden bg-slate-900 w-32 rounded-md disabled:bg-gray-800" disabled>Split</button> */}
                    <button ref={this.stand} onClick={(e) => { this.standClick(e) }} className="hidden bg-slate-900 w-32 rounded-md disabled:bg-gray-800">Stand</button>
                    <button ref={this.newgameBtn} onClick={(e) => { this.newgame(e) }} className="bg-slate-900 w-40 rounded-md">New Game</button>
                </div>
                <div id="yourhand" className="flex relative inset-x-0 bottom-0 justify-center w-full h-full">
                <h1 className="absolute flex text-center mt-5">Your Hand - {(() => {
                    if (this.state.count > 21) {
                        return <span className="text-red-500 ml-2"> Bust ({this.state.count})</span>
                    } else if (this.state.count === 21) {
                        return <span className="text-green-500 ml-2"> Blackjack! ({this.state.count})</span>
                    } else {return this.state.count}
                })()}</h1>
                    <div ref={this.playersHands} id="udeck" className="mt-10 relative grid grid-rows-1 gap-4">
                        {this.state.playersHand.map((hand) => {
                            // console.log(hand)
                            return <Card type={hand.type} number={hand.num} value={hand.value} double={hand.double} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}