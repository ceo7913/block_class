import React from "react";

// 이렇게 컴포넌트로 작업을 하면 좋은점은
// 일반 태그처럼 우리가 원하는 내용을 태그화 해서 사용할 수 있기 때문에
// 이렇게 쓰면 뭐가 좋냐하면 코드의 재활용성이 용이해 진다.
// 이렇게 하면 좋은점은 역시 유지보수가 편하다.

// 리액트의 데이터 구조는 단방향 위에서 아래로 데이터를 전달해 줄 수 있다.
// 여기서 받은 num 매개변수의 명칭은 props 이다.
// 부모 컴포넌트가 자식 컴포넌트한테 데이터를 전달해 줄 수 있다.
// 단방향 자식이 줄 수 는 없다. 부모가 줄 수 있다.

// 중괄호 써주는 이유는 js 구문을 사용하겠다는 얘기
// 중괄호를 사용하면 js 구문을 사용할 수 있단 뜻
const Calendar = (num) => {
  const { name, age, english } = num;

  return (
    // 여기서는 class 가 아니라 classNmae 으로 사용한다. id 는 그냥 id
    //  밑에 "com"은 공통 클레스를 주기 위함
    <div className="calendar">
      <div className="header">
        <div className="months">{name}</div>
        <div className="right">
          <div className="years">{age}</div>
          <div className="text">{english}</div>
        </div>
      </div>
      <table className="cd_box">
        <tr className="days">
          <td>SUN</td>
          <td>MON</td>
          <td>TUE</td>
          <td>WED</td>
          <td>THU</td>
          <td>FRI</td>
          <td>SAT</td>
        </tr>
        <tr className="nums">
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
        </tr>
        <tr className="nums">
          <td>8</td>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>12</td>
          <td>13</td>
          <td>14</td>
        </tr>
        <tr className="nums">
          <td>15</td>
          <td>16</td>
          <td>17</td>
          <td>18</td>
          <td>19</td>
          <td>20</td>
          <td>21</td>
        </tr>
        <tr className="nums">
          <td>22</td>
          <td>23</td>
          <td>24</td>
          <td>25</td>
          <td>26</td>
          <td>27</td>
          <td>28</td>
        </tr>
        <tr className="nums numsLast">
          <td>29</td>
          <td>30</td>
        </tr>
      </table>
    </div>
  );
};
// dafault 하나만 내보낼 때
export default Calendar;
