// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Counter {
    uint256 private _count;

    // view는 상태 변수를 변경하는게 아니라 데이터를 읽기만 하는것.
    function current() public view returns(uint256){
        return _count;
    }

    function increment() public {
        _count += 1;
    }

    function decrement() public {
        _count -= 1;
    }
}