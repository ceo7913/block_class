// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// ERC721 토큰 표준 가져오고
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract Minting is ERC721 {
    // ERC721 생성자 함수 ERC721(_name, _symbol)
    constructor(string memory _name, string memory _symbol) ERC721(_name,_symbol){

    }

    function _minting(uint _tokenId) public {
        _mint(msg.sender,_tokenId);
        // _tokenId 키값
        // _tokenId : 토큰의 고유값, msg.sender 토큰을 받는 계정
    }

    function tokenURI(uint) public override pure returns (string memory){
        return "https://gateway.pinata.cloud/ipfs/QmRW9sRDAiFgt2wGqPiCnqoBjyAswDBt2qGaq6bMxxgNNh";
        // 반환값은 우리가 만들어서 넣어줄 json 객체
        // pure 는 state 값을 변경할 수 없다.
        // 이 함수 밖에 있는 값을 읽어 올 수 도 없고 변경도 불가능 

        // nft 객체의 내용
        // {
        //     "name" : "이름",
        //     "description" : "설명",
        //     "image" : "이미지 경로",
        //     "attributes" : ["속성 값"]
        // }
    }
}
