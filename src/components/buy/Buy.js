import React, { Component } from 'react';
import BasicDisplay from './BasicDisplay';
import elonDownImg from '../elon/elon_down.png';
import elonUpImg from '../elon/elon_up.png';


export default class Buy extends Component {

    state = {
        elon: "",
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.likeTheCoinDifference !== this.props.likeTheCoinDifference) {
            this.displayLikes();
        }
        if(prevProps.elonUpCount !== this.props.elonUpCount && !prevProps.elonUpFirst) {
            this.displayElon(elonUpImg);
        } 
        if(prevProps.elonDownCount !== this.props.elonDownCount && !prevProps.elonDownFirst) {
            this.displayElon(elonDownImg)
        }
    }

    displayElon = (image) => {
        
        const likeButton = document.getElementById('likeTheCoinDiv');
        const likeXL = likeButton.getBoundingClientRect().left;
        const likeXR = likeButton.getBoundingClientRect().right;
        const likeX = likeXL + (likeXR - likeXL) / 2;
        const likeYT = likeButton.getBoundingClientRect().top;
        const likeYB = likeButton.getBoundingClientRect().bottom;
        const likeY = likeYT + (likeYT - likeYB) / 2;
        const elon = <img src={image} alt="Elon" style={{width:"50px", position: "absolute", left: likeX, top: likeY}} className='floatingLikes'/>
        this.setState({
            elon: elon
        })
        setTimeout(() => {
            this.setState({
                elon: ""
            })
        }, 5000);
    }

    displayLikes = () => {
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
                <BasicDisplay 
                    selectPurchaseAmount={this.props.selectPurchaseAmount}
                    purchaseAmount={this.props.purchaseAmount}
                    selectedSeller={this.props.selectedSeller}
                    buyButtonClass={this.props.buyButtonClass}
                    makePurchase={this.props.makePurchase}
                    cancelButtonClass={this.props.cancelButtonClass}
                    cancelPurchase={this.props.cancelPurchase}
                    likeTheCoinClass={this.props.likeTheCoinClass}
                    likeTheCoin={this.props.likeTheCoin}
                />
                {this.state.elon}
            </div>
        )
    }
}