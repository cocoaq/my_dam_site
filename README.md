# 리액트 미니 프로젝트

'2024-11-05~'

> 카멜케이스

## 매니저 로그인

>manager/pass123

## PHP 라이브러리를 사용하기 위한 수동 업로드 

* project/vendor/ 디렉토리 전체 → 서버의 public_html/vendor/
* project/composer.json → 서버의 public_html/composer.json
* project/composer.lock → 서버의 public_html/composer.lock

## DB구조(mySQL)
### Community
1. COM_NO 기본키	int 	AUTO_INCREMENT	
2. COM_TITLE	varchar(255)	NN
3. COM_CONTENS	text		NN
4. COM_DATE	varchar(255)	NN	
5. COM_TYPE	int		0->기본 1->공지사항	
6. COM_COUNT	int		조회수(추후에 넣기. 기본 0)
7. COM_MEMBER	v		MEM_NO


### Member
1. MEM_NO	기본키 	int	AUTO_INCREMENT	
2. MEM_NAME	varchar(25)	NN	User
3. MEM_COMMENT	varchar(200)		NULL	
4. MEM_ID		varchar(25)	NN	없음		
5. MEM_PASS			NN	없음

## 컬러
* rgb(113, 21, 233)
* rgb(191, 101, 229)
* rgb(245, 227, 255)
* rgb(24, 20, 140)