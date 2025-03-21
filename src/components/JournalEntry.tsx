import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Save, Loader2 } from 'lucide-react';
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
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, [userId, category]);

  const fetchHistory = async () => {
    try {
      console.log('Fetching history for user:', userId, 'category:', category);
      const { data, error } = await supabase
        .from('user_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
        throw error;
      }
      console.log('Fetched history:', data);
      setHistory(data || []);
    } catch (err) {
      console.error('Error in fetchHistory:', err);
      setError('Failed to load previous entries');
    }
  };

  const generateTitle = (content: string) => {
    if (!content.trim()) return 'Untitled Entry';
    const words = content.trim().split(/\s+/);
    const title = words.slice(0, 3).join(' ');
    return title + (words.length > 3 ? '...' : '');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = async () => {
    if (!content.trim()) {
      setError('Please enter some content before saving');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      console.log('Saving entry for user:', userId);
      const entryTitle = title.trim() || generateTitle(content);
      const entryData = {
        user_id: userId,
        category,
        content,
        title: entryTitle
      };
      console.log('Entry data:', entryData);

      const { data, error } = await supabase
        .from('user_insights')
        .insert(entryData)
        .select()
        .single();

      if (error) {
        console.error('Error saving entry:', error);
        throw error;
      }

      console.log('Entry saved successfully:', data);

      // Award XP (5 for morning reflection, 5 for evening journal)
      await onComplete(5);
      setContent('');
      setTitle('');
      await fetchHistory();
    } catch (err) {
      console.error('Error in handleSave:', err);
      setError('Failed to save entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {category === 'morning' ? 'Morning Reflection' : 'Evening Journal'}
        </h3>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Optional title for your entry"
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={6}
            placeholder={`Write your ${category === 'morning' ? 'intentions for today' : 'reflections on the day'}...`}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
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
                Save Entry
              </>
            )}
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Previous Entries</h4>
          <div className="space-y-2">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{entry.title || generateTitle(entry.content)}</div>
                      <div className="text-sm text-gray-500">{formatDate(entry.created_at)}</div>
                    </div>
                  </div>
                  {expandedEntry === entry.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedEntry === entry.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-3 bg-white"
                    >
                      <div className="whitespace-pre-wrap text-gray-700">{entry.content}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntry; 