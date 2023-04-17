import {
  ellipsis,
  ellipsisMulti,
  flex,
  font,
  lineHeight,
  mediaQuery,
} from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const ForthWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 140px;

  ${mediaQuery(
    'mobile',
    `
      margin-top: 61px;
    `,
  )};
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 calc((100% - 1290px) / 2);
  ${mediaQuery(
    'mobile',
    `
     padding: 0 24px;
    `,
  )};
`;

const TopWrapper = styled.div`
  width: 100%;
  ${flex('space-between', 'center')};
`;

const BottomWrapper = styled.div`
  ${flex()};
  margin-top: 36px;
  gap: 24px;

  ${mediaQuery(
    'mobile',
    `
      flex-direction: column;
      margin-top: 19px;
      gap: 16px;
    `,
  )};

  .card-wrapper {
    ${mediaQuery(
      'mobile',
      `
      width: 100%;
      height: 100%;
      padding: 24px 20px;
    `,
    )};
    .card-label {
      ${mediaQuery(
        'mobile',
        `
        margin-bottom: 8px;
      `,
      )};
      p {
        ${mediaQuery(
          'mobile',
          `
          ${font('caption12', 'bold')};
          ${lineHeight(12, 20)};
          ${ellipsis()};
        `,
        )};
      }
    }
    .card-title {
      ${mediaQuery(
        'mobile',
        `
        max-width: 220px;
        margin-bottom: 2px;
        height: 100%;
        ${font('mobile16', 'bold')};
        ${lineHeight(16, 26)};
        ${ellipsis()};
        display: inline-block;
      `,
      )};
    }
    .card-content {
      ${mediaQuery(
        'mobile',
        `
        margin-bottom: 16px;
        height: 100%;
        ${font('mobile14', 'normal')};
        ${lineHeight(14, 22)};
        color: rgba(6, 11, 17, 0.56);
      `,
      )};
    }
    .card-date {
      p {
        ${mediaQuery(
          'mobile',
          `
        height: 100%;
        ${font('caption12', 'demilight')};
        ${lineHeight(12, 20)};
         letter-spacing: -0.1px;
      `,
        )};
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  ${mediaQuery(
    'mobile',
    `
        margin-top: 36px;
      `,
  )};
`;

const Title = styled.div`
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.color.textBlackHigh};

  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  ${mediaQuery(
    'mobile',
    `
        ${font('mobile24', 'bold')};
        ${lineHeight(24, 36)};
        letter-spacing: -0.4px;
      `,
  )};
`;

export {
  TopWrapper,
  InnerWrapper,
  ForthWrapper,
  BottomWrapper,
  ButtonWrapper,
  Title,
};
