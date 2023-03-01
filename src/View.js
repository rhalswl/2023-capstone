import React, { useEffect, useState } from 'react';
import './View.css';
import dummy from "./data.json";

function View() {
    const text=1;
    const pList = dummy.titles.filter(titlecontent => (titlecontent.text === text));

    const [progress, setProgress] = useState(false);

    return (
        <div className='detail'>
            <div className='content_4'>
                <div className='content_4_a'>
                    <div>
                        <button className='cbtn' onClick={() => {
                            setProgress(!progress);
                        }}>
                            {progress ? "모집완료" : "모집중"}
                        </button>
                    </div>                    
                </div>
                    
                <div className='content_4_b'>
                    <input type='button' value='수정'/>
                    <input type='button' value='삭제'/>
                </div>
            </div>

            <div className='content_1'>
                <div>제목</div>
            </div>

            <div className='content_2'>
                <div className='content_2_a'>
                    <div>작성자</div>
                    <div>|</div>
                    <div>날짜</div>
                </div>
                <div className='content_2_c'>
                    <div></div>
                </div>
                <div className='content_2_b'>
                    <div></div>
                </div>
            </div>

            <div className='content_5'>
                <div className='content_5_a'>
                    <div>모집인원</div>
                    <div>시작 예정일</div>
                </div>
                <div className='content_5_b'>
                    <div>진행기간</div>
                    <div>태그</div>
                </div>
            </div>

            <div className='content_3'>
                <div>내용</div>
            </div>

            <div className='content_6'>
                <input type='text' className='reply_input' placeholder='댓글 내용을 입력해주세요.' />
                <div className='reply_choose'>
                    <input type='checkbox'></input>
                    <text className='rc1'>비밀댓글</text>
                    <input type='button' className='sbtn' value='등록'></input>
                </div>

                
            </div>

        </div>
    );
}

export default View;

/*


<input type='number' id='number' classname='number'></input>
<input type='button' value='취소' id='cancel' className='cancel' onClick={onReset}/>
<input type='button' value='모집중' id='view_list_button1' />
<input type={text} />

*/


/*
<dlv className='secret_reply'>
                    <div>비밀댓글</div>
                    <input type='button' value="등록">등록</input>
                </dlv>

*/