import useNavigate from '../../../hooks/useNavigate';

const useSecondSection = () => {
  const { handleNavigate } = useNavigate();

   const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('introduce');
  };

  return {
    handleNavigateTo,
  };
};

export default useSecondSection;
