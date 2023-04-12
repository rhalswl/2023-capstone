import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import emptyHeart from "../../images/emptyHeart.png";
import fullHeart from "../../images/heart.png";
import view from "../../images/view.png";
import comment from "../../images/comment.png";

import styles from "./StudyRoomCard.module.css";
import userStore from "../../store/user.store";

function StudyRoomCard({ title, tags, id, onClick }) {
  const user = userStore();
  const commentCount = 7;

  const [heart, setHeart] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const changeHeart = () => {
    setHeart(!heart);
  };

  const clickHeart = () => {
    if (user.token !== null) {
      axios
        .post(`http://localhost:8080/setGoodPost/${id}`, null, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setHeart(!heart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("로그인 해주세요.");
      setHeart(false);
    }
  };

  // 관심글
  const HeartBtn = () => {
    if (!heart) {
      return (
        <img
          className={styles.heart}
          src={emptyHeart}
          alt="emptyHeart"
          onClick={() => {
            changeHeart();
            clickHeart();
          }}
        ></img>
      );
    } else {
      return (
        <img
          className={styles.heart}
          src={fullHeart}
          alt="fullHeart"
          onClick={() => {
            changeHeart();
            clickHeart();
          }}
        ></img>
      );
    }
  };

  // 해시태그
  function Hashtag() {
    return (
      <div className={styles.tagPackage}>
        {tags &&
          tags.map((tag, index) => {
            if (typeof tag === "object" && tag.id) {
              return (
                <a
                  className={styles.studyTag}
                  key={tag.id + tag + index}
                  id={tag.id}
                >
                  {"#" + tag}
                </a>
              );
            } else {
              return (
                <a className={styles.studyTag} key={index + tag + "else"}>
                  {"#" + tag}
                </a>
              );
            }
          })}
      </div>
    );
  }

  useEffect(() => {
    if (user.token !== null) {
      axios
        .get(`http://localhost:8080/getGoodPost/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setHeart(response.data.good);
          } else if (response.status === 204) {
            setHeart(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/getViewCount",
        { id: id, postName: "study" } // 서버로 전달할 id
      )
      .then((response) => {
        if (response.status === 200) {
          setViewCount(response.data.count);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div key={id + title} className={styles.questionBoxWrapper}>
      <HeartBtn />
      <div className={styles.studyBox} onClick={onClick && onClick}>
        <a>{id}</a>
        <h1 className={styles.studyTitle}>{title}</h1>
        {<Hashtag />}
        <div className={styles.reaction}>
          <img className={styles.view} src={view} alt="view"></img>
          <a>{viewCount}</a>
          <img className={styles.comment} src={comment} alt="comment"></img>
          <a>{commentCount}</a>
        </div>
      </div>
    </div>
  );
}

export default StudyRoomCard;
