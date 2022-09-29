/**
 * 리덕스란?
 *
 * 리액트에서 사용할 수 있는 라이브러리
 *
 * 실무에서 리덕스를 안쓰면 매우 불편하기 때문에 필수로 사용한다.
 *
 * 리액트는 자식 컴포넌트에 props로 전달은 가능한데
 *
 * 다른 컴포넌트에서 직접 데이터 공유가 불가능하다...
 *
 * 그래서 공유해야할 데이터를 공유받는 자식 컴포넌트 공동부모에서 State를
 *
 * 만들어서 자식 컴포넌트에게 전달해주는데
 *
 * 리액트는 데이터의 흐름이 단방향이기 때문에
 *
 * 작업을 하다보면 부모 컴포넌트에 무척 많은 props가 생기는데
 *
 * 이런 단점을 보완하기 위해서
 *
 * 리덕스는 state를 저장해주는 store(저장소) 각각의 컴포넌트가
 *
 * 어떤 위치에 컴포넌트가 있더라도 공통된 store(저장소)를 사용할 수 있다.
 *
 * 쉽게 생각해서 컴포넌트에서 값을 요청하고 전달받는걸 직접할수 있다.
 *
 * 근데 컴포넌트에서 저장소에 값을 직접적으로 바로 수정부분은 안된다.
 *
 * 함수를 통해서 동작하는 방식으로 수정과 요청이 가능
 *
 * 리덕스 동작 구조
 *
 * 값을 저장하는 구조는
 *
 * useDispatch 리액트 훅 함수
 *
 * 컴포넌트 -> useDispatch(컴포넌트가 action요청) -> Action(주문) -> Reducer(store요청) -> store (값 반영)
 *
 * 컴포넌트가 Action을 보내고 reducer로 전달받고 store의 값을 최신화 시킨다.
 *
 * Action은 동작할 기능의 행동
 *
 * Reducer는 함수인데 내가 사용할 동작들을 case(조건문)를 모아둔곳
 *
 * 컴포넌트가 어떤동작을 할지 Action을 Reducer로 보내고 store(저장소)의 값을 바꿔준다.
 *
 * store(저장소) 객체라고 생각하면 되고 state 값을 저장해둘 객체
 *
 * state의 값이 바뀌면 컴포넌트가 리렌더링 된다.
 *
 * 값을 가져오는 구조는
 *
 * useSelector 리액트 훅 함수
 *
 * store -> useSelector -> 컴포넌트
 *
 * useSelector는 store에 있는 값을 가져올 때 사용하는 함수
 *
 * 리덕스 사용법
 *
 * npm i redux
 *
 * npm i react-redux
 *
 * redux는 리액트에서만 쓸 수 있는게 아니라 다른곳에서도 쓸 수 있다.
 *
 * Provider
 *
 * Provider
 * Provider 컴포
 *
 *
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 * const [a, setState]= useState()
 *
 * <mypage a={} a={} a={} a={} a={} a={} a={} a={} >  <mypage/>
 */
