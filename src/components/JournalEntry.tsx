import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type JournalEntry = Database['public']['Tables']['user_insights']['Row'];

interface JournalEntryProps {
  userId: string;
  category: 'morning' | 'evening';
  onComplete: (xp: number) => void;
  onClose: () => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ userId, category, onComplete, onClose }) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('user_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_insights')
        .insert({
          user_id: userId,
          category,
          content: content.trim()
        });

      if (error) throw error;

      // Refresh history
      await fetchHistory();
      
      // Clear current content
      setContent('');
      
      // Award XP
      onComplete(5);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !content.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save & Complete
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write your ${category} reflection here...`}
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />

        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Entries</h3>
            <div className="space-y-4">
              {history.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(entry.created_at)}
                  </div>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {entry.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntry; 