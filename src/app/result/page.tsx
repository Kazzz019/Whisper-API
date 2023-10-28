import { useRouter } from 'next/router';


function ResultPage() {
    const router = useRouter();
    const { convertedText } = router.query;  // Extracting convertedText from the URL

    return (
        <div>
            <p>{convertedText}</p>
        </div>
    );
}

export default ResultPage;
