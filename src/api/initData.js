const initData = () => (
    fetch('http://localhost/app/')
    .then(res => res.json())
);

export default initData;
