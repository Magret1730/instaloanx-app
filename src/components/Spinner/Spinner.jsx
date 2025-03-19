import FadeLoader from 'react-spinners/FadeLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};

const Spinner = ({ loading }) => {
    return (
        <FadeLoader
        color='rgb(0, 134, 111)'
        loading={loading}
        cssOverride={override}
        size={150}
        />
    );
};
export default Spinner;

