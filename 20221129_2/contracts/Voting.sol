// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8 .17;

contract Voting {
    string[] public candidateList;
    mapping(string => uint8)public votesReceived;

    // {   "후보이름": 0,   "후보이름": 2,   "후보이름": 3,   "후보이름": 4, }

    constructor(string[] memory candidateNames) {
        // 후보자들 초기화 배열 전달
        candidateList = candidateNames;
    }
    
    // 후보자 표 갯수 확인
    function totalVotesFor(string memory candidate) public view returns(uint8){
        require(validCandidate(candidate));
        // 검증을 마친 후보자의 표 갯수 반환
        return votesReceived[candidate];
    }


    // 후보자 투표 해주는 함수
    function voteForCandidate(string memory candidate) public {
        // 있는 후보자인지 확인하고 
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    // 후보자 있는 후보자인지 확인 검증
    function validCandidate(string memory candidate) private view returns(bool){
        // keccak256 이 함수로 string 값을 해싱해서 16진수로 바꾼다음
        // 해시값을 비교한다.
        // 스마트 컨트랙트에서 문자열을 비교할 수 가 없어서 keccak256 함수로 
        // 값을 해싱해서 비교한다.(해시값을 비교)
        for (uint i = 0; i < candidateList.length; i++){
            if(keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate)))
            {
                return true;
            }
        }
        return false;
    }
}