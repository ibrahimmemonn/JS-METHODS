import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Pagination, Checkbox, Col, Row, AutoComplete } from "antd";

const Images = {
  1: [
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "tree",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
  ],
  2: [
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "tree",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "tree",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
  ],
  3: [
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
    {
      type: "tree",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      type: "react",
      image:
        "https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png",
    },
    {
      type: "tree",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
    {
      type: "Anaaj",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GHAdHH5JRAecOr55AsY3Xj_EWzFeGDu5a08r3hInbPDImAfCb85a0-ApSrbzmz4OzBI&usqp=CAU",
    },
  ],
};

function getData(query, signal) {
  const Fruits = ["APPLE", "BANANA", "SAIB", "MAMMMEEYY"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason);
      }
      resolve(
        Fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 500);
  });
}

function useDebounce(value, time = 250) {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceVal(value);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);
  return debounceVal;
}

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

function App() {
  const [query, setQuery] = useState(2);
  const [suggester, setSuggester] = useState([]);
  const [filterImg, setFilterImg] = useState("");
  const debounceVal = useDebounce(query);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [key, setKey] = useState(1);

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };
  const onSelect = (data) => {
    console.log("onSelect", data);
  };
  const onChange1 = (data) => {
    setValue(data);
  };
  useEffect(() => {
    let ignore = false;
    (async () => {
      setSuggester([]);
      if (debounceVal.length > 0) {
        const data = await getData(debounceVal);
        if (!ignore) {
          setSuggester(data);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [debounceVal]);

  let arr = [1, 2, 3];
  const filter = (type) => {
    let newArr = [];
    type.map((typeItem) => {
      let filterImages = [];
      arr.map((item) => {
        let a = Images[item].filter((Images) => Images?.type === typeItem);
        filterImages = [...filterImages, ...a];
      });
      newArr = [...newArr, ...filterImages];
    });
    setFilterImg(newArr);
  };
  const onChange = (checkedValues) => {
    filter(checkedValues);
    console.log("aa", checkedValues);
  };
  return (
    <div className="App">
      <input value={query} onChange={(e) => setQuery(e?.target?.value)} />
      <div>
        {suggester.map((suggesters) => (
          <div key={suggesters}>{suggesters}</div>
        ))}
      </div>

      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
      >
        <Row>
          <Col span={8}>
            <Checkbox value="tree">Tree</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="react">React</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="Anaaj">Anaaj</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      {filterImg?.length > 0 ? (
        <>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              padding: 50,
            }}
          >
            {filterImg.map((img) => {
              return (
                <img height={100} src={img?.image} style={{ margin: 50 }} />
              );
            })}
          </div>
          <Pagination
            defaultCurrent={1}
            total={1}
            pageSize={1}
            current={key}
            onChange={setKey}
          />
        </>
      ) : (
        <>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              padding: 50,
            }}
          >
            {Images[key].map((item) => (
              <img height={100} src={item?.image} style={{ margin: 50 }} />
            ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={18}
            pageSize={6}
            current={key}
            onChange={setKey}
          />
        </>
      )}
    </div>
  );
}

export default App;
