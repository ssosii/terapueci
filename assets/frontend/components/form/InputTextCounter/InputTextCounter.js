import { h, render } from 'preact';
import "./InputTextCounter.scss";

// const InputTextCounter = ({ signsNumber, limit,children }) => {
//   return (
//     <Container>
//       <Counter>
//         {signsNumber}/{limit}
//       </Counter>
//       {children}
//     </Container>
//   );
// };

// export { InputTextCounter };

// const Container = styled('div')`
//   position: relative;
// `;

// const Counter = styled('div')`
//   position: absolute;
//   top: -2px;
//   right: 2px;
//   font-size: 10px;
// `;


const InputTextCounter = ({ signsNumber, limit }) => {
    return (
        <div className="counter--component">
            Użyto {signsNumber}/{limit} znaków.
        </div>
    );
};

export { InputTextCounter };