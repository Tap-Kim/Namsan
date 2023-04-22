import { WrappedComponentProps } from 'gatsby-plugin-intl';
import { MouseEventHandler } from 'react';

type TUrl = 'main' | 'introduce' | 'work' | 'members' | 'news' | 'contact';

interface IGNBProps extends WrappedComponentProps {
  isTransparent?: boolean;
  isMobile?: boolean;
}

interface IMobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  onClick: MouseEventHandler;
  isMobile?: boolean;
}

export { TUrl, IGNBProps, IMobileMenuButtonProps };
