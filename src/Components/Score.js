import React from 'react';

const Score = ({ score, total }) => {
  return (
    <div className="text-center text-2xl font-bold mb-4">
      Score: {score} / {total}
    </div>
  );
};

export default Score;
