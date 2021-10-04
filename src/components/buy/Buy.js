import React, { Component } from 'react';
import Button from '../button/Button';
// import elonDownImg from '../elon/elon_down.png';
// import elonUpImg from '../elon/elon_up.png';


export default class Buy extends Component {

    state = {
        basicDisplay: <div className="buyDiv">
            <div className="buyCoinDiv">
                <p>How many coins? </p>
                <input 
                    type="number" 
                    placeholder='0.00'
                    onChange={this.props.selectPurchaseAmount}
                    value={this.props.purchaseAmount}
                >
                </input>
            </div>
            <div className="buySellerDiv">
                <p>Seller: </p>
                <p>{this.props.selectedSeller.substring(60, 75)}</p>
            </div>
            <div className="buyButtonDiv">
                <div id="buyButton">
                    <Button 
                        buttonText="Buy!"
                        class={this.props.buyButtonClass}
                        action={this.props.makePurchase}
                    />
                </div>
                <div id="cancelBuyDiv">
                    <Button 
                        buttonText="Cancel"
                        class={this.props.cancelButtonClass}
                        action={this.props.cancelPurchase}
                    />
                </div>
                <div id="likeDiv">
                </div>
                <div id="likeTheCoinDiv">
                    <Button 
                        id="likeTheCoinButton"
                        buttonText="👍"
                        class={this.props.likeTheCoinClass}
                        action={this.props.likeTheCoin}
                    />
                </div>
            </div>
        </div>,

        toDisplay: "",
    }

    componentDidMount() {
        this.setState({
            toDisplay: this.state.basicDisplay
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("PREVPROPS: ", prevProps)
        // console.log("CURPROPS: ", this.props)
        if(prevProps.likeTheCoinDifference !== this.props.likeTheCoinDifference) {
            this.clearOldLikes();
            console.log('New count difference: ', this.props.likeTheCoinDifference);
            const likeDiv = document.getElementById('likeDiv');
            const likeButton = document.getElementById('likeTheCoinDiv');
            const likeXL = likeButton.getBoundingClientRect().left;
            const likeXR = likeButton.getBoundingClientRect().right;
            const likeX = likeXL + (likeXR - likeXL) / 2;
            likeDiv.style.left = likeX + 'px';
            const likeYT = likeButton.getBoundingClientRect().top;
            const likeYB = likeButton.getBoundingClientRect().bottom;
            const likeY = likeYT + (likeYT - likeYB) / 2;
            likeDiv.style.top = likeY + 'px';
            console.log(likeX);
            [...Array(this.props.likeTheCoinDifference).keys()].forEach(id => {
                setTimeout(function() {
                    const like = document.createElement('p');
                    like.className = 'floatingLikes';
                    like.innerText = "👍";
                    const xRand = Math.floor(Math.random() * 50 + 1);
                    const xPositivity = Math.round(Math.random()) ? 1 : -1;
                    like.style.setProperty('--x-drift', (xRand * xPositivity) + 'px');
                    likeDiv.appendChild(like);
                }, 200 * id)
            })
        }
        if(prevProps.elonUpCount !== this.props.elonUpCount) {
            console.log("ELON'S UP TO SOMETHING");
        } 
    }

    clearOldLikes = () => {
        const likeDiv = document.getElementById('likeDiv');
        if (likeDiv.childElementCount > 150) {
            while(likeDiv.firstChild) {
                likeDiv.removeChild(likeDiv.lastChild);
            }
        }
    }

    render () {
        return (
            <div>
                {this.state.toDisplay}
            </div>
        )
    }
}