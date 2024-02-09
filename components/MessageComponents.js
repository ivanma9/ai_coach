const TextMessage = ({ message }) => <p>{message.text}</p>;

const PollMessage = ({ message, onVote }) => (
	<div>
		<p>{message.question}</p>
		{message.options.map((option, index) => (
			<button key={index} onClick={() => onVote(index)}>
				{option}
			</button>
		))}
	</div>
);
