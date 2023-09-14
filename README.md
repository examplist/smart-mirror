## 날짜만 입력한 경우

results 테이블 사용

## 부분도 입력한 경우

해당 부분 테이블 이용

## 관리자 부분도 포함하는 SQL

```sql
SELECT DISTINCT results.id AS id, uuid, smile, laugh, closeEye, openEye, results.user AS user
  FROM eye JOIN results ON eye.result = results.id
	WHERE results.user = 'name1_2000-01-01' AND accMoveLeft >= 5 AND accMoveLeft <= 10;
```
