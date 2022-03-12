import "./App.css";
import React from "react";

function App() {
  const [prevState, setPrevState] = React.useState({ prevValue: "" });
  const [currState, setCurrState] = React.useState({ currValue: "" });
  const [input, setInput] = React.useState({ inputValue: "" });
  const [operator, setOperator] = React.useState({ operationType: "" });
  const [total, setTotal] = React.useState({ totalValue: "", result: "" });

  const inputNum = (e) => {
    setCurrState((currState) => {
      return { ...currState, currValue: currState.currValue + e };
    });
  };

  const deleteInput = () => {
    setCurrState((currState) => {
      return {
        ...currState,
        currValue: currState.currValue
          .toString()
          .substring(0, currState.currValue.toString().length - 1),
      };
    });
  };

  const operatorType = (e) => {
    if (operator.operationType === "" && currState.currValue !== "") {
      setOperator((operator) => {
        return {
          ...operator,
          operationType: e,
        };
      });
      setPrevState((prevState) => {
        return { ...prevState, prevValue: currState.currValue };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: "",
        };
      });
    } else return;
  };

  const equals = () => {
    if (operator.operationType === "+") {
      setTotal((total) => {
        return {
          ...total,
          totalValue: `${prevState.prevValue} + ${currState.currValue} = `,
          result: Number(prevState.prevValue) + Number(currState.currValue),
        };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: Number(prevState.prevValue) + Number(currState.currValue),
        };
      });

      setOperator((operator) => {
        return { ...operator, operationType: "" };
      });
    } else if (operator.operationType === "-") {
      setTotal((total) => {
        return {
          ...total,
          totalValue: `${prevState.prevValue} - ${currState.currValue} = `,
          result: Number(prevState.prevValue) - Number(currState.currValue),
        };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: Number(prevState.prevValue) - Number(currState.currValue),
        };
      });
      setOperator((prevState) => {
        return { ...prevState, operationType: "" };
      });
    } else if (operator.operationType === "X") {
      setTotal((total) => {
        return {
          ...total,
          totalValue: `${prevState.prevValue} X ${currState.currValue} = `,
          result: Number(prevState.prevValue) * Number(currState.currValue),
        };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: Number(prevState.prevValue) * Number(currState.currValue),
        };
      });
      setOperator((prevState) => {
        return { ...prevState, operationType: "" };
      });
    } else if (operator.operationType === "/") {
      setTotal((total) => {
        return {
          ...total,
          totalValue: `${prevState.prevValue} / ${currState.currValue} = `,
          result: Number(prevState.prevValue) / Number(currState.currValue),
        };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: Number(prevState.prevValue) / Number(currState.currValue),
        };
      });
      setOperator((prevState) => {
        return { ...prevState, operationType: "" };
      });
    } else if (operator.operationType === "%") {
      setTotal((total) => {
        return {
          ...total,
          totalValue: `${prevState.prevValue} % ${currState.currValue} = `,
          result: Number(prevState.prevValue) % Number(currState.currValue),
        };
      });
      setCurrState((currState) => {
        return {
          ...currState,
          currValue: Number(prevState.prevValue) % Number(currState.currValue),
        };
      });
      setOperator((prevState) => {
        return { ...prevState, operationType: "" };
      });
    }
  };

  const reset = () => {
    setCurrState((currState) => {
      return { ...currState, currValue: "" };
    });
    setPrevState((prevState) => {
      return { ...prevState, prevValue: "" };
    });
    setTotal((total) => {
      return { ...total, totalValue: "", result: "" };
    });
    // window.location.reload();
  };

  const handlePress = (e) => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
      inputNum(e.key);
    } else if (e.keyCode === 13) {
      equals();
    } else if (e.keyCode === 8) {
      deleteInput();
    }

    if (e.keyCode === 187) {
      operatorType("+");
    } else if (e.keyCode === 189) {
      operatorType("-");
    } else if (e.keyCode === 88 || (e.keyCode === 56 && e.key === "*")) {
      operatorType("X");
    } else if (e.keyCode === 53 && e.key === "%") {
      operatorType("%");
    } else if (e.keyCode === 191) {
      operatorType("/");
    }
  };

  React.useEffect(() => {
    setInput((input) => {
      return {
        ...input,
        inputValue: currState.currValue
          ? currState.currValue
          : operator.operationType,
      };
    });
  }, [currState.currValue]);

  return (
    <div className="container">
      <div className="container__wrapper">
        <div className="container__screenWrapper">
          <input
            className="container__screen screen__one"
            type="text"
            value={` ${total.totalValue ? total.totalValue : ""} ${
              total.result ? total.result : ""
            }`}
          />

          <input
            className="container__screen screen__two"
            autoFocus
            type="text"
            onKeyUp={handlePress}
            value={input.inputValue}
          />
        </div>
      </div>
      <div className="container__wrapper">
        <button className="container__btn light__grey" onClick={reset}>
          AC
        </button>
        <button
          className="container__btn light__grey"
          onClick={() => operatorType("%")}
        >
          %
        </button>
        <button className="container__btn light__grey" onClick={deleteInput}>
          ◀
        </button>
        <button
          className="container__btn orange"
          onClick={() => operatorType("/")}
        >
          /
        </button>
      </div>
      <div className="container__wrapper">
        <button className="container__btn" onClick={() => inputNum("7")}>
          7
        </button>
        <button className="container__btn" onClick={() => inputNum("8")}>
          8
        </button>
        <button className="container__btn" onClick={() => inputNum("9")}>
          9
        </button>
        <button
          className="container__btn orange"
          onClick={() => operatorType("X")}
        >
          X
        </button>
      </div>
      <div className="container__wrapper">
        <button className="container__btn" onClick={() => inputNum("4")}>
          4
        </button>
        <button className="container__btn" onClick={() => inputNum("5")}>
          5
        </button>
        <button className="container__btn" onClick={() => inputNum("6")}>
          6
        </button>
        <div
          className="container__btn orange"
          onClick={() => operatorType("+")}
        >
          +
        </div>
      </div>
      <div className="container__wrapper">
        <button className="container__btn" onClick={() => inputNum("1")}>
          1
        </button>
        <button className="container__btn" onClick={() => inputNum("2")}>
          2
        </button>
        <button className="container__btn" onClick={() => inputNum("3")}>
          3
        </button>
        <button
          className="container__btn orange"
          onClick={() => operatorType("-")}
        >
          -
        </button>
      </div>
      <div className="container__wrapper">
        <button className="container__btn zero" onClick={() => inputNum("0")}>
          0
        </button>
        <button className="container__btn" onClick={() => inputNum(".")}>
          &bull;
        </button>
        <button className="container__btn" onClick={equals}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
