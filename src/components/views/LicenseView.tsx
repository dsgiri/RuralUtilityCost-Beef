import React from 'react';

export function LicenseView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-[60vh]">
      <h1 className="text-4xl font-bold text-earth-dark mb-6 tracking-tight">License Information</h1>
      
      <div className="prose prose-lg text-gray-700 space-y-6">
        <p>
          The code powering the Beef App within the <strong>Rural Ops Tools</strong> ecosystem is provided subject to standard open-source licensing principles for educational and professional demonstration purposes, or as otherwise outlined by the master site.
        </p>
        
        <div className="bg-gray-100 p-6 rounded font-mono text-sm mt-8 border border-gray-200">
          <p>SPDX-License-Identifier: Apache-2.0</p>
          <p className="mt-4">
            Licensed under the Apache License, Version 2.0 (the "License");<br />
            you may not use this file except in compliance with the License.<br />
            You may obtain a copy of the License at
          </p>
          <p className="mt-4 text-blue-600">
            http://www.apache.org/licenses/LICENSE-2.0
          </p>
          <p className="mt-4">
            Unless required by applicable law or agreed to in writing, software<br />
            distributed under the License is distributed on an "AS IS" BASIS,<br />
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br />
            See the License for the specific language governing permissions and<br />
            limitations under the License.
          </p>
        </div>
      </div>
    </div>
  );
}
