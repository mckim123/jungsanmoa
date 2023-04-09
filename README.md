# 정산모아

https://port-0-jungsanmoa-p8xrq2mlfzlzped.sel3.cloudtype.app/

정산모아는 모임, 회식, 데이트 등의 정산을 쉽고 효율적으로 할 수 있도록 하는 웹 애플리케이션입니다.
프론트엔드는 React, MUI로 구현되었고, 백엔드는 Java와 Spring을 사용했습니다.

## 버전

- React: 18.2.0
- MUI: 5.11.15
- npm: 9.5.0
- Java: 11
- Spring Boot: 2.7.10
- Gradle: 7.6.1

## 개발 기간

2023.03.31 ~

## 기능

- 여러 사용자간의 정산을 손쉽게 진행할 수 있습니다.
- 다양한 정산 방식을 적용할 수 있습니다. 정산 방식은 개별 지출마다 설정할 수 있습니다.
- 정산 결과를 상세하게 보여주고, 원하는 경우 이미지로 내보낼 수 있습니다.
- 최적화된 최종 송금을 제시하여 총 송금 횟수를 최소화하여 정산 과정의 효율성을 높일 수 있습니다.
- 정산 내역을 확인할 수 있습니다.

### 적용 가능한 정산 방식

- 기본 : 전체 금액을 참여자 수로 나누어 부담하는 방식입니다.
- 정산 완료 : 부담 액수는 기본과 동일하나, 이미 정산이 완료됨을 고려하여 정산 내역에만 추가하는 방식입니다.
- 비율 조정 : 늦게 온 인원에게는 70%만 부담시키는 등 참가자 별 정산 비율을 달리 할 수 있는 방식입니다.
- 가격 조정 : 늦게 온 인원에게는 5000원을 빼주거나, 지각자가 5000원을 더 부담하는 등 참가자 별 차등 금액을 설정할 수 있는 방식입니다.
- 가격 지정 : 한 명은 만원을 내기로 확정하는 등 일부 인원의 금액이 고정된 경우 사용하는 방식입니다.
- 주류 별도 : 음주자와 비음주자의 정산 금액을 달리하는 방식입니다. 총 주류의 금액을 주류를 소비한 참가자에게만 부담시키는 방식입니다.
- 쏜다 : 한 명이 전액을 지불하는 상황에서 사용하는 옵션입니다. 정산 내역에만 추가됩니다.

## API

- `GET /`: 메인 페이지를 반환합니다.
- `POST /`: 정산을 진행하고 결과를 반환합니다.

## 배포

깃허브 레포지토리에서 바로 배포할 수 있는 [Cloudtype](https://cloudtype.io/) 서비스를 활용하였습니다.

## 프론트엔드 관련 부가 설명

- 리액트 관련 지식이 없어, [chatGPT](chat.openai.com/chat)를 최대한 활용하여 프론트엔드를 구성하였습니다. 모바일 관련 최적화는 대부분 진행되었으며, 추가적으로 구현될 예정입니다.
- 현재 프론트엔드 모듈은 프로젝트 하위에 별도로 생성은 하였으나, 별도 배포의 공수를 고려하여 빌드 후 백엔드의 src/main/resources/static 하위에 파일을 복사하는 방식으로 구현하였습니다. 추후
  분리를 검토할 예정입니다.

## 계획중인 추가 기능

1. 정산 결과를 생성할 때마다 48시간 동안 해당 정산 결과를 DB에 보관하고, URL 및 QR 코드를 제공하여 다른 사람들도 동일한 정산 결과 페이지를 볼 수 있도록 합니다.

    - 동일 사용자로부터의 의도치 않은 반복 요청이나, 의도한 반복 요청 등으로 인해 제한된 배포 환경에서 운영하기 적절한 지 검토 후 반영 예정입니다.
    - 동일 IP로부터의 요청 중 저장되는 개수를 제한하거나, 로그인을 시키는 방식을 검토중입니다. 민감 정보인지 고려하여 반영 예정입니다.

2. 각 정산 내역별로 영수증을 사진 파일의 형태로 첨부할 수 있는 기능을 추가할 예정입니다.
    - 1번 기능의 적용을 전제로 합니다.
