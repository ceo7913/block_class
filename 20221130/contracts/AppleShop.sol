// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract AppleShop {
    // address 속성명, uint 속성값, myApple 변수명의 객체
    mapping(address => uint) myApple;

    // payable 속성이 있을때 CA 는 ETH 를 받을 수 있다.
    // 트랜잭션 객체에 value 값을 ETH 로 전달할 수 있다.
    // 사과 구매 함수
    function buyApple() public payable{
        myApple[msg.sender] += 1;
    }


    // 사과 전체 판매 함수
    function sellApple(uint applePrice) public payable {
        uint256 refund = myApple[msg.sender] * applePrice;
        myApple[msg.sender] = 0;
        // payable 함수의 매개변수로 주소를 전달해 준다.
        // 전달한 주소의 계정에 돈을 보내줌
        // 보내주는 돈은 사과의 갯수
        payable(msg.sender).transfer(refund);
    }


    // 가지고 있는 사과 확인 함수
    function getApple() view public returns (uint){
        return myApple[msg.sender];
    }
}